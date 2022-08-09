import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import "./asideInfo.scss";

const AsideInfo: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  return (
    <aside>
      <h3>Баланс</h3>
      <p>- 0 UAH</p>
      <section>
        <h3>Готівка</h3>
        <p>- 0 UAH</p>
        <button>Редагувати</button>
      </section>
      <h3>Мої Картки</h3>
    </aside>
  );
};

export default AsideInfo;
