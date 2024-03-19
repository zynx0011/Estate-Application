import React, { useRef, useState } from "react";
import { app } from "../FireBase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Config/config";

const Listing = () => {
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  console.log(formData);

  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const data = currentUser?.data?.data?.user;
  const navigate = useNavigate();

  const uploadImages = () => {
    if (images.length > 0 && images.length && formData.imageUrls.length < 6) {
      setUploading(true);
      const promises = [];
      for (let i = 0; i < images.length; i++) {
        promises.push(storeImage(images[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageError("Image upload failed  please try again");
          setUploading(false);
        });
    } else {
      setImageError("Image upload failed  please select less than 7 images");
      setUploading(false);
    }
  };

  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "furnished" ||
      e.target.id === "parking" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      if (formData.imageUrls.length < 1)
        return setError("Please add at least one image");
      if (formData.regularPrice < formData.discountPrice)
        return setError("Discounted price should be less than regular price");
      setLoading(true);
      setError(false);

      // const res = await fetch("/api/v1/listing/create", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     ...formData,
      //     userRef: data?._id,
      //   }),
      // });
      // const data = await res.json();
      // setLoading(false);
      // if (data.success === false) {
      //   setError(data.message);
      // }
      const res = await axios.post(
        `${BASE_URL}/api/v1/listing/create`,
        {
          ...formData,
          userRef: data?._id || currentUser?._id,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      if (res.data.success === false) {
        setError(res.data.message);
      }
      navigate(`/listing/${res.data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 mb-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">
        List your property
      </h1>
      <form onSubmit={handlesubmit} className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            type="text"
            className="p-3 rounded-lg "
            name="name"
            id="name"
            required
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            min={10}
            max={100}
          />
          <textarea
            type="text"
            className="p-3 rounded-lg "
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="description"
          />
          <input
            type="text"
            className="p-3 rounded-lg "
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="address"
          />
          <div className="flex p-4 sm:p-0 flex-wrap gap-6">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <p>parking</p>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <p>furnished</p>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <p>offer</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 sm:gap6 p-4 sm:p-0">
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="bedrooms"
                id="bedrooms"
                min={1}
                max={10}
                required
                className="p-3 border rounded-lg w-16"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="bathrooms"
                id="bathrooms"
                min={1}
                max={10}
                required
                className="p-3 border rounded-lg w-16"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="regularPrice"
                id="regularPrice"
                min={50}
                max={100000}
                required
                className="p-3 border rounded-lg w-16"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <p>Regular Price</p>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="discountPrice"
                  id="discountPrice"
                  min={50}
                  max={100000}
                  required
                  className="p-3 border rounded-lg w-16"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <p>Discounted Price</p>
              </div>
            )}
          </div>
        </div>
        <div className="p-2 flex-1 sm:ml-3  ">
          <p className=" mb-4">
            <span className="font-bold">Images:</span> The first image will be
            cover ( max 6 )
          </p>
          <div className="flex  ">
            <input
              type="file"
              name="images"
              id="images"
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
              multiple
              min={1}
              max={6}
              className="p-3 border rounded-lg mr-2 "
            />
            <button
              type="button"
              disabled={uploading}
              onClick={uploadImages}
              className=" border rounded-lg font-bold p-4 border-green-400 "
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {imageError && <span className="text-red-700 ">{imageError}</span>}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <div className="mt-4">
            <button
              type="submit"
              disabled={loading || uploading}
              className=" border rounded-lg font-bold p-3 w-full text-green-500"
            >
              {loading ? "Creating Listing..." : "Create Listing"}
            </button>
            {error && <span className="text-red-700 ">{error}</span>}
          </div>
        </div>
      </form>
    </main>
  );
};

export default Listing;
