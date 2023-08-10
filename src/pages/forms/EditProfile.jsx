import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import PasswordInput from "../../components/shared/ui/PasswordInput";
import { useUpdateAdminMutation } from "../../features/auth/authApi";
import getCompressedImage from "../../utils/getCompresedImage";

function EditProfile() {
  const [updateAdmin, { isLoading }] = useUpdateAdminMutation();
  const { user, accessToken } = useSelector((state) => state.auth);
  const profileRef = useRef();
  const [profile, setProfile] = useState(null);
  const [profilePreveiw, setProfilePreveiw] = useState(user?.fileUrl || null);
  const [isTypeError, setIsTypeError] = useState(false);
  // const [resetPassword, { isLoading }] = use ();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isShowConfirmIcon, setIsShowConfirmIcon] = useState(false);
  const [compressedLoading, setCompressedLoading] = useState(false);
  const navigate = useNavigate();

  const errorNotify = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const infoNotify = (message) =>
    toast.info(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleInputTwo = (event) => {
    setIsShowConfirmIcon(event.target.value.trim().length > 0);
  };

  const handleInput = (event) => {
    setIsShowIcon(event.target.value.trim().length > 0);
    const password = event.target.value;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasLength = password.length >= 8;
    const hasSpecialSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasLength &&
      hasSpecialSymbol
    ) {
      setIsStrong(true);
    } else {
      setIsStrong(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (
      file?.type === "image/jpg" ||
      file?.type === "image/png" ||
      file?.type === "image/jpeg"
    ) {
      profileRef.current.files = event.dataTransfer.files;
      const imageURL = URL.createObjectURL(file);
      setProfile(file);
      setProfilePreveiw(imageURL);
      setIsTypeError(false);
    } else {
      profileRef.current.value = "";
      setProfile(null);
      setProfilePreveiw(null);
      setIsTypeError(true);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (
      file?.type === "image/jpg" ||
      file?.type === "image/png" ||
      file?.type === "image/jpeg"
    ) {
      const imageURL = URL.createObjectURL(file);
      setProfile(file);
      setProfilePreveiw(imageURL);
      setIsTypeError(false);
    } else {
      profileRef.current.value = "";
      setProfile(null);
      setProfilePreveiw(null);
      setIsTypeError(true);
    }
  };

  const handleProfileDelete = () => {
    profileRef.current.value = "";
    setProfile(null);
    setProfilePreveiw(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value || "";
    const lastName = form.lastName.value || "";
    const email = form.email.value || "";
    const phoneNumber = form.phoneNumber.value || "";
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;
    const formData = new FormData();
    if (profile?.name) {
      setCompressedLoading(true);
      const compressedFile = await getCompressedImage(profile);
      setCompressedLoading(false);
      formData.append("files", compressedFile);
    }

    if (newPassword) {
      if (newPassword !== confirmPassword) {
        errorNotify("Password doesn't match");
        return;
      }
      const data = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: newPassword,
      };
      formData.append("data", JSON.stringify(data));
      updateAdmin({
        data: formData,
        id: user?._id,
        token: accessToken,
      })
        .unwrap()
        .then((res) => {
          // infoNotify("User update successfull");
          navigate("/profile");
        })
        .catch((error) => {
          errorNotify("User update failed");
          console.log(error);
        });
    } else {
      const data = {
        firstName,
        lastName,
        email,
        phoneNumber,
      };
      formData.append("data", JSON.stringify(data));
      updateAdmin({
        data: formData,
        id: user?._id,
        token: accessToken,
      })
        .unwrap()
        .then((res) => {
          // infoNotify("User update successfull");
          navigate("/profile");
        })
        .catch((error) => {
          errorNotify("Update user failed");
          console.log(error);
        });
    }
  };

  return (
    <section className="h-full w-full overflow-auto px-10 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-2xl font-bold">Edit Profile</h4>
        </div>
        <div className="bg-whiteHigh w-full">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-start gap-6">
                {/* name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    First Name :
                  </span>
                  <input
                    required
                    type="text"
                    name="firstName"
                    placeholder="Enter firstname"
                    defaultValue={user?.firstName}
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm placeholder:text-fadeColor"
                  />
                </div>
                {/* name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Last Name :
                  </span>
                  <input
                    required
                    type="text"
                    name="lastName"
                    placeholder="Enter lastname"
                    defaultValue={user?.lastName}
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm placeholder:text-fadeColor"
                  />
                </div>
                {/* profile */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Avatar (140X140):
                  </span>
                  <div className="w-full relative">
                    {!profilePreveiw ? (
                      <div
                        className="h-[140px] w-full flex flex-col items-center justify-center border border-dashed border-primaryMainDarkest rounded-lg bg-whiteLight px-4 py-6"
                        onDrop={handleDrop}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="41"
                              height="40"
                              viewBox="0 0 41 40"
                              fill="none"
                            >
                              <path
                                d="M12.6622 34.9683C10.3856 34.7935 8.22243 33.9038 6.48159 32.4264C4.74075 30.9489 3.51123 28.9592 2.96859 26.7413C2.42595 24.5235 2.59794 22.1909 3.46 20.0766C4.32207 17.9623 5.83012 16.1744 7.76883 14.9683C8.18135 11.7517 9.75183 8.79577 12.1864 6.65353C14.6209 4.51128 17.7526 3.32959 20.9955 3.32959C24.2384 3.32959 27.3701 4.51128 29.8046 6.65353C32.2392 8.79577 33.8096 11.7517 34.2222 14.9683C36.1609 16.1744 37.6689 17.9623 38.531 20.0766C39.393 22.1909 39.565 24.5235 39.0224 26.7413C38.4798 28.9592 37.2502 30.9489 35.5094 32.4264C33.7686 33.9038 31.6054 34.7935 29.3288 34.9683V34.9999H12.6622V34.9683ZM22.6622 21.6666H27.6622L20.9955 13.3333L14.3288 21.6666H19.3288V28.3333H22.6622V21.6666Z"
                                fill="#234B4C"
                              />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-center text-fadeColor">
                            <label
                              htmlFor="profile"
                              className="text-primaryMainDarkest cursor-pointer"
                            >
                              Upload Image
                            </label>{" "}
                            or Drag and Drop <br />
                            JPG, JPEG or PNG
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="h-[140px] flex flex-col items-center justify-center rounded-lg bg-whiteLight relative overflow-hidden"
                        onDrop={handleDrop}
                      >
                        <label htmlFor="profile" className="w-full h-full">
                          <img
                            src={profilePreveiw}
                            alt=""
                            className="w-full h-full object-cover bg-cover"
                          />
                        </label>
                        <button
                          type="button"
                          className="absolute top-4 right-4 h-7 w-7 bg-errorColor rounded-full flex items-center justify-center"
                          onClick={handleProfileDelete}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            id="close"
                          >
                            <path
                              fill="#fff"
                              d="M7.05 7.05a1 1 0 0 0 0 1.414L10.586 12 7.05 15.536a1 1 0 1 0 1.414 1.414L12 13.414l3.536 3.536a1 1 0 0 0 1.414-1.414L13.414 12l3.536-3.536a1 1 0 0 0-1.414-1.414L12 10.586 8.464 7.05a1 1 0 0 0-1.414 0Z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    )}
                    <input
                      type="file"
                      id="profile"
                      onChange={handleFileSelect}
                      className="absolute bottom-14 left-44 w-1 h-1 opacity-0"
                      ref={profileRef}
                    />
                    {isTypeError && (
                      <p className="text-errorLightColor text-sm">
                        Only JPG, JPEG and PNG file are supported
                      </p>
                    )}
                  </div>
                </div>
                {/* email */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Email:
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    defaultValue={user?.email}
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm placeholder:text-fadeColor"
                  />
                </div>

                {/* phone */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Phone No :
                  </span>
                  <input
                    required
                    type="number"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    defaultValue={user?.phoneNumber}
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm placeholder:text-fadeColor appearance-none"
                  />
                </div>

                {/* Old Password : */}
                {/* <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Old Password :
                  </span>
                  <input
                    type="text"
                    name="oldPassword"
                    placeholder="Old password"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm placeholder:text-fadeColor"
                  />
                </div> */}

                {/* NEW PASSWORD  */}

                <div className="">
                  <div className="flex items-center gap-3">
                    <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                      New Password :
                    </span>
                    <PasswordInput
                      isShowPassword={isShowPassword}
                      setIsShowPassword={setIsShowPassword}
                      handleInput={handleInput}
                      isShowIcon={isShowIcon}
                      name="newPassword"
                      placeholder="Enter new password"
                    ></PasswordInput>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right"></span>
                    {!isStrong && (
                      <p className="text-[10px] text-fadeColor mt-1">
                        Must contain more than 7 character with uppercase,
                        lowercase, symble and number
                      </p>
                    )}
                  </div>
                </div>
                {/* confirm PASSWORD  */}

                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Confirm Password :
                  </span>
                  <div className="w-full">
                    <PasswordInput
                      isShowPassword={isShowConfirmPassword}
                      setIsShowPassword={setIsShowConfirmPassword}
                      handleInput={handleInputTwo}
                      isShowIcon={isShowConfirmIcon}
                      name="confirmPassword"
                      placeholder="Enter confirm password"
                    ></PasswordInput>
                  </div>
                </div>

                {/* edit button */}
                <div className="flex items-center justify-end gap-3">
                  <Link
                    to="/profile"
                    className="w-full max-w-[160px] p-4 rounded-full font-medium border border-errorLightColor text-errorLightColor text-center"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="w-full max-w-[160px] p-4 rounded-full bg-primaryMainLight font-medium text-whiteHigh text-center"
                    disabled={isShowIcon ? (isStrong ? false : true) : false}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {(compressedLoading || isLoading) && <RequestLoader></RequestLoader>}
      <div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </section>
  );
}

export default EditProfile;
