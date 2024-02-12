import React from "react";

const Listing = () => {
  return (
    <main className="p-3 mb-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">
        List your property
      </h1>
      <form className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            type="text"
            className="p-3 rounded-lg "
            name="name"
            id="name"
            required
            placeholder="Name"
            min={10}
            max={100}
          />
          <textarea
            type="text"
            className="p-3 rounded-lg "
            name="description"
            id="description"
            required
            placeholder="description"
          />
          <input
            type="text"
            className="p-3 rounded-lg "
            name="address"
            id="address"
            required
            placeholder="address"
          />
          <div className="flex p-4 sm:p-0 flex-wrap gap-6">
            <div className="flex gap-2 ">
              <input type="checkbox" name="sell" id="sell" className="w-5" />
              <p>sell</p>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" name="rent" id="rent" className="w-5" />
              <p>rent</p>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
              />
              <p>parking</p>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
              />
              <p>furnished</p>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" name="offer" id="offer" className="w-5" />
              <p>offer</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 sm:gap6 p-4 sm:p-0">
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="beds"
                id="beds"
                min={1}
                max={10}
                required
                className="p-3 border rounded-lg w-16"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="baths"
                id="baths"
                min={1}
                max={10}
                required
                className="p-3 border rounded-lg w-16"
              />
              <p>baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="regularPrice"
                id="regularPrice"
                min={1}
                max={10}
                required
                className="p-3 border rounded-lg w-16"
              />
              <p>Regular Price</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="discountedPrice"
                id="discountedPrice"
                min={1}
                max={10}
                required
                className="p-3 border rounded-lg w-16"
              />
              <p>Discounted Price</p>
            </div>
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
              multiple
              min={1}
              max={6}
              required
              className="p-3 border rounded-lg mr-2 "
            />
            <button className=" border rounded-lg font-bold p-1 border-green-400 ">
              {" "}
              Upload Images
            </button>
          </div>
          <div className="mt-4">
            <button className=" border rounded-lg font-bold p-3 w-full text-green-500">
              Create Listing
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Listing;
