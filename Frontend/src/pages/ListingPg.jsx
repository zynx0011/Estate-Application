import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ListingPg = () => {
  const params = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(false);
        const listingId = params.listingId;
        const res = await axios.get(`/api/v1/listing/get/${listingId}`);

        console.log(res.data.data);
        setFormData(res.data.data);
        // if (formData.imageUrls.length === 0) {
        //   console.log("here");
        //   return setError("Please add at least one image");
        // }
        console.log(formData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && (
        <h1 className="text-center font-bold text-2xl">Loading....</h1>
      )}
      {error && (
        <h1 className="text-center text-red-600 font-bold text-2xl">
          Something went wrong
        </h1>
      )}
      {formData && !loading && !error && (
        <div className="div">
          {formData.imageUrls && (
            <div className="flex items-center justify-center">
              <img
                src={formData.imageUrls[0]}
                alt="li"
                className="w-[30%]  object-cover"
              />
            </div>
          )}
          <h1 className="text-center font-semibold text-3xl">
            {formData.name}
          </h1>
          <h1 className="text-center font-semibold text-xl">
            {formData.description}
          </h1>
          <div className="flex  justify-center items-center gap-4 mb-5 mt-4">
            <div>Price : {formData.regularPrice} $</div>
            <div>Bedrooms : {formData.bedrooms} </div>
            <div>Bathroom : {formData.bathrooms}</div>
            <div>Parking spot : {formData.parking}</div>
            <div>Furnished : {formData.furnished}</div>
            <div>Address : {formData.address}</div>
            <div>Type : {formData.type}</div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ListingPg;
