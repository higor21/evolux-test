export type PhoneProps = {
  phoneNumber: string;
  currency: string;
  setupPrice: number | string;
  monthyPrice: number | string;
};

export type OptPhoneProps = {
  phoneNumber?: string;
  currency?: string;
  setupPrice?: number | string;
  monthyPrice?: number | string;
};

export type InputChangeProps = { target: { value: string } };

export type PhoneResProps = { id: number } & PhoneProps;

