"use client";
import useSWR from "swr";
import DestinationCard from "./DestinationCard";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const DestinationResult = ({ country }) => {
  const { data, error, isLoading } = useSWR(
    `https://dreamscape-api-iswd.onrender.com/destinations/getDestination?country=${country}`,
    fetcher
  );
  console.log(data);
  if (error)
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 text-center text-white">
        <div>can't get data at the moment</div>
      </div>
    );
  if (isLoading)
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 text-center text-white">
        <div>Loading...</div>
      </div>
    );

  if (Object.keys(data).length <= 0)
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 text-center text-white">
        <div>can't find any results related to {country}</div>
      </div>
    );
  return (
    <div className="container mx-auto px-4 sm:px-6  ">
      <div className="w-full min-h-[400px] rounded-md flex justify-center items-start flex-wrap gap-3">
        {data.map((result) => (
          <DestinationCard result={result} key={result._id} />
        ))}
      </div>
    </div>
  );
};

export default DestinationResult;
