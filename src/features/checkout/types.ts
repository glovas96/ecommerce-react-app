import type { ChangeEvent, FormEventHandler } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { CartItem } from '@/entities/cart/types';
import type { CheckoutFormData } from '@/entities/checkout/types';
import type { CheckoutFormFields } from '@/shared/validation/checkoutSchema.types';

export interface CheckoutAddressProps {
  register: UseFormRegister<CheckoutFormFields>;
  errors: FieldErrors<CheckoutFormFields>;
  serverError?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export interface PaymentOptionsProps {
  payment: CheckoutFormData['payment'];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface DeliveryOptionsProps {
  delivery: CheckoutFormData['delivery'];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface ReviewItemsProps {
  items: CartItem[];
}

export interface OrderSummaryProps {
  itemTotal: number;
  shippingCost: number;
  taxAmount: number;
  summaryTotal: number;
  onPlaceOrder: () => void;
  loading: boolean;
}
