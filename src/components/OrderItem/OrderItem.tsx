import React from 'react';
import styled from 'styled-components';

export interface IOrderItemComponent {
  title: string,
}

const OrderItem: React.FC<IOrderItemComponent> = ({
  title,
}) => {
  return (
    <OrdersItemWrapper className='order__item'>
      {title && title}
    </OrdersItemWrapper>
  );
}

export default OrderItem;

export const OrdersItemWrapper = styled.div`
  &.order__item {
  }

  @media (min-width: 992px) {
    &.order__item {
    }
  }
`;