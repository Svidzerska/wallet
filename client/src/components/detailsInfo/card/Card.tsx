import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";

import "./card.scss";

interface Props {
  number?: string;
  expire_date?: string;
  value?: string;
  currency?: string;
  scheme?: string;
  type?: string;
}

const Card: React.FC<Props> = ({ number, expire_date, value, currency, scheme, type }): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isSaveNumber, setSaveNumber] = useState<boolean>(true);
  const [isCopy, setCopy] = useState<boolean>(false);

  useEffect(() => {
    if (!isSaveNumber) {
      setTimeout(() => {
        setSaveNumber(true);
        setCopy(false);
      }, 3000);
    }
  }, [isSaveNumber]);

  const saveNumber = (): string | undefined => {
    if (isSaveNumber) {
      return number?.substring(0, 4) + " " + "****" + " " + "****" + " " + number?.substring(15, 19);
    } else {
      return number;
    }
  };

  return (
    <div className={`card ${type === "debit" ? "debit" : "credit"}`}>
      <h2>
        <button
          onClick={() => {
            if (isSaveNumber) {
              setSaveNumber(false);
              navigator.clipboard.writeText(`${number}`);
              setCopy(true);
            } else {
              setSaveNumber(true);
              setCopy(false);
            }
          }}
        >
          {saveNumber()}
        </button>
        <p className="copy_number">{isCopy && "copy"}</p>
      </h2>
      <h3>
        {value} {currency}
      </h3>
      <h3>{expire_date}</h3>
      <h2 className="cardType">
        <p>{scheme}</p> <p>{type}</p>
      </h2>
    </div>
  );
};

export default Card;
