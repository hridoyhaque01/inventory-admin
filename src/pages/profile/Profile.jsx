import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { avatar } from "../../assets/getAssets";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  return (
    <section className="h-full w-full overflow-auto px-10 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-2xl font-bold">Edit Profile</h4>
        </div>
        <div className="bg-whiteHigh w-full">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="">
              <div className="flex flex-col justify-start gap-6">
                {/* name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[100px] shrink-0 whitespace-nowrap text-right">
                    Name:
                  </span>
                  <input
                    type="text"
                    placeholder="Name"
                    readOnly
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm bg-whiteMid"
                    defaultValue={user?.firstName + " " + user?.lastName}
                  />
                </div>
                {/* profile pic */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[100px] shrink-0 whitespace-nowrap text-right">
                    Profile Image:
                  </span>
                  <div>
                    <img
                      src={user?.fileUrl || avatar}
                      alt=""
                      className="w-40 h-40 rounded-full bg-cover bg-center object-cover"
                    />
                  </div>
                </div>
                {/* Email: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[100px] shrink-0 whitespace-nowrap text-right">
                    Email:
                  </span>
                  <input
                    type="text"
                    placeholder="Email address"
                    readOnly
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm bg-whiteMid"
                    defaultValue={user?.email}
                  />
                </div>
                {/* phone no */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[100px] shrink-0 whitespace-nowrap text-right">
                    Phone No :
                  </span>
                  <input
                    type="text"
                    placeholder="Phone number"
                    readOnly
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm bg-whiteMid"
                    defaultValue={user?.phoneNumber}
                  />
                </div>
                {/* edit button */}
                <div className="flex items-center justify-end gap-6">
                  <Link
                    to="/"
                    className="w-full max-w-[160px] p-4 rounded-full font-medium border border-errorLightColor text-errorLightColor text-center"
                  >
                    Cancel
                  </Link>
                  <Link
                    to="/edit-profile"
                    className="w-full max-w-[160px] p-4 rounded-full bg-primaryMainLight font-medium text-whiteHigh text-center"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
