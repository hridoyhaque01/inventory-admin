import React from "react";

const PaidToOwnerModal = ({ email, errorNotify, infoNotify, handler }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const paidAmount = form.paidAmount.value;
    const data = {
      paidAmount,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    console.log(data);
  };
  return (
    <section>
      <input type="checkbox" id="paidToOwnerModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-[640px] max-w-[640px] flex flex-col items-center justify-center gap-4 bg-white">
          <div className="w-full max-w-[540px]">
            <div className="flex justify-center mb-6">
              <span className="inline-block p-3 rounded-full font-medium bg-warningLowColor">
                Paid To Owner
              </span>
            </div>
            <form action="" className="w-full" onSubmit={handleSubmit}>
              <div className="w-full flex flex-col justify-start gap-6">
                {/* NEW PASSWORD  */}

                {/* Shop Name: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[100px] shrink-0 whitespace-nowrap text-right">
                    Due Amount :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter due amount"
                    name="dueAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm"
                    readOnly
                  />
                </div>

                {/* Paid Amount : */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[100px] shrink-0 whitespace-nowrap text-right">
                    Paid Amount :
                  </span>
                  <input
                    type="text"
                    placeholder="Paid amount"
                    name="paidAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm"
                  />
                </div>

                {/* submit button  */}

                <div className="flex items-center gap-3">
                  <span className="inline-block w-[100px] shrink-0 whitespace-nowrap text-right"></span>
                  <div className="modal-action flex items-center justify-center">
                    <label
                      htmlFor="paidToOwnerModal"
                      className="btn rounded-full w-[160px] bg-transparent text-errorLowColor border-errorLowColor hover:border-errorLowColor hover:bg-transparent cursor-pointer"
                    >
                      Cancel
                    </label>
                    <button type="submit">
                      <label
                        htmlFor="paidToOwnerModal"
                        className="btn rounded-full w-[160px] bg-primaryMainLight hover:bg-primaryMainLight border-secondaryColor hover:border-primaryMainLight text-whiteHigh cursor-pointer"
                      >
                        Save
                      </label>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaidToOwnerModal;
