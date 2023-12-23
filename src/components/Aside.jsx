import { collection, count, getAggregateFromServer } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const Aside = () => {
  const tweetCol = collection(db, "tweets");
  const [data, setData] = useState(null);

  useEffect(() => {
    getAggregateFromServer(tweetCol, {
      tweetCol: count(),
    }).then((data) => setData(data._data));
  }, []);

  return <div className="max-lg:hidden">
    <p className="my-5 text-align-center p-3 text-lg">Toplam Tweet Sayısı: {data?.tweetCol.integerValue}</p>
  </div>;
};

export default Aside;
