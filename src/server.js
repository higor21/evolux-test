import { createServer, Model, Factory } from 'miragejs';
import { currencySymbolsArr } from 'shared/constants';
import { formatNumber } from 'shared/helpers';

const DEFAULT_PAGE_SIZE = 7;
const DEFAULT_PAGE = 1;

const server = () => {
  createServer({
    models: {
      phone: Model,
    },

    routes() {
      this.get('/api/phones', (schema, request) => {
        const {
          queryParams: {
            page = DEFAULT_PAGE,
            pageSize = DEFAULT_PAGE_SIZE,
            search,
          },
        } = request;

        const phones = schema.db.phones;

        const realPage = Number(page) - 1;

        if (Number(pageSize) && realPage >= DEFAULT_PAGE - 1) {
          const start = Number(pageSize) * realPage;
          const end = start + Number(pageSize);

          const filteredPhones = search
            ? phones.filter((p) => p.phoneNumber.includes(search))
            : phones;
          const itens = filteredPhones.slice(start, end);

          return {
            data: itens,
            count: filteredPhones.length,
            nextPage: filteredPhones.length > end ? Number(page) + 1 : null,
          };
        }
        return phones;
      });

      this.get('/api/phones/:id', (schema, request) => {
        const id = request.params.id;

        return schema.phones.find(id);
      });

      this.post('/api/phones', (schema, request) => {
        const newPhone = JSON.parse(request.requestBody);

        return schema.phones.create(newPhone);
      });

      this.put('/api/phones/:id', (schema, request) => {
        const updatedPhone = JSON.parse(request.requestBody);
        const id = request.params.id;

        return schema.phones.find(id).update(updatedPhone);
      });

      this.delete('/api/phones/:id', (schema, request) => {
        const id = request.params.id;

        return schema.phones.find(id).destroy();
      });
    },

    seeds(srv) {
      srv.createList('phone', 800);
    },

    factories: {
      phone: Factory.extend({
        phoneNumber: (i) => {
          const countryCode = Math.trunc(Math.random() * 90 + 10);
          const stateCode = Math.trunc(Math.random() * 90 + 10);

          const uniqueCodeLen = i.toString().length;

          const restOfNumber = Math.random() // ensure that the phone number will be unique
            .toString()
            .slice(2, 11 - uniqueCodeLen);

          return `${countryCode}${stateCode}${i}${restOfNumber}`;
        },
        currency: () =>
          currencySymbolsArr[
            Math.trunc(Math.random() * currencySymbolsArr.length)
          ],
        setupPrice: () => Number.parseFloat((Math.random() * 10).toFixed(2)),
        monthyPrice: (i) => Number.parseFloat((Math.random() * 2).toFixed(2)),
      }),
    },
  });
};

export default server;
