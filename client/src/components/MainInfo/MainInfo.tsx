import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import "./mainInfo.scss";

const MainInfo: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  return (
    <main>
      <p>Main Section</p>
    </main>
  );
};

export default MainInfo;
