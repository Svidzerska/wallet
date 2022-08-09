import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import "./generalInfo.scss";

const GeneralInfo: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  return (
    <section className="generalInfo__section">
      <h3 className="balance">Баланс</h3>
      <p>- 0 UAH</p>
      <section>
        <h3>Готівка</h3>
        <p>- 0 UAH</p>
        <button>Редагувати</button>
      </section>
      <h3>Мої Картки</h3>
    </section>
  );
};

export default GeneralInfo;
