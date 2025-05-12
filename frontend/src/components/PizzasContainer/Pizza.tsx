import React, { FC, PropsWithChildren } from "react";
import { IPizza } from "../../interfaces/pizzaInterface";
interface IProps extends PropsWithChildren {
  pizza:IPizza
}
const Pizza :FC <IProps> = ({pizza}) => {
  const {name, price, diameter} = pizza
  return (
    <div>
<div>Name:{name}</div>
<div>Diameter:{diameter}</div>
<div>Price:{price}</div>
    </div>
  );
};

export default Pizza;