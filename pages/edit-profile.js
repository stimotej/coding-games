import { useState, useEffect } from "react";
import FormCard from "../components/FormCard";
import Layout from "../components/Layout";
import SelectImage from "../components/SelectImage";
import Sidebar from "../components/Sidebar";
import { MdCheck, MdClose, MdPerson, MdLock, MdDelete } from "react-icons/md";
import Input from "../components/Input";
import useUser from "../lib/useUser";
import axios from "axios";
import { useRouter } from "next/router";

const EditProfile = () => {
  const router = useRouter();

  const { user, mutate: setUser } = useUser();

  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [deleteUsername, setDeleteUsername] = useState("");

  const [activeTab, setActiveTab] = useState("userdata");

  const [saveStatus, setSaveStatus] = useState(null);
  const [changePasswordStatus, setChangePasswordStatus] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setFullName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleScroll = (e, elValues) => {
    const pageYPosition = window.pageYOffset + window.innerHeight;
    elValues.forEach((el) => {
      if (pageYPosition >= el.top + el.height) setActiveTab(el.id);
    });
  };

  useEffect(() => {
    const formElements = document.getElementsByClassName("form-card");
    const elValues = Array.from(formElements).map((el) => {
      const height = el.clientHeight;
      const rect = el.getBoundingClientRect();
      return { height, top: rect.top, id: el.id };
    });

    window.addEventListener("scroll", (e) => handleScroll(e, elValues));

    return () =>
      window.removeEventListener("scroll", (e) => handleScroll(e, elValues));
  }, []);

  const handleSave = (e) => {
    var data = {};
    if (profileImage) {
      data = new FormData();
      data.append("username", username);
      data.append("name", fullName);
      data.append("email", email);
      data.append("image", profileImage);
    } else {
      data = { username, name: fullName, email };
    }
    setLoading("userdata");
    axios
      .patch("/auth/profile", data)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setSaveStatus("success");
        setTimeout(() => {
          setSaveStatus(null);
        }, 2000);
      })
      .catch((err) => {
        setSaveStatus(err.response.data?.message || "Saving failed");
      })
      .finally(() => setLoading(null));
  };

  const handleChangePassword = (e) => {
    if (newPassword !== newPasswordConfirm) {
      setChangePasswordStatus("Confirmation password doesn't match.");
    } else if (newPassword === currentPassword) {
      setChangePasswordStatus("Your new password is same as current.");
    } else {
      setLoading("password");
      axios
        .patch("/auth/password", {
          currentPassword,
          newPassword,
        })
        .then((res) => {
          setUser(res.data);
          setChangePasswordStatus("success");
          setTimeout(() => {
            setChangePasswordStatus(null);
          }, 2000);
          setCurrentPassword("");
          setNewPassword("");
          setNewPasswordConfirm("");
        })
        .catch((err) => {
          console.log(err.response);
          setChangePasswordStatus(
            err.response.data?.message || "Saving failed"
          );
        })
        .finally(() => setLoading(null));
    }
  };

  const handleDeleteAccount = () => {
    setLoading("delete");
    if (deleteUsername !== user?.username) {
      setDeleteStatus("Wrong username");
    } else {
      axios
        .delete("/auth/profile")
        .then((res) => {
          localStorage.removeItem("auth-token");
          setUser(null);
          router.push("/");
        })
        .catch((err) => {
          console.log(err.response);
          setDeleteStatus(err.response.data?.message || "Deleting failed");
        })
        .finally(() => setLoading(null));
    }
  };

  const dataChanged = () =>
    username !== user?.username ||
    fullName !== user?.name ||
    email !== user?.email ||
    profileImage;

  const tabs = [
    {
      title: "User data",
      value: "/edit-profile#userdata",
      icon: <MdPerson size={22} />,
    },
    {
      title: "Change password",
      value: "/edit-profile#password",
      icon: <MdLock size={22} />,
    },
    {
      title: "Delete account",
      value: "/edit-profile#delete",
      icon: <MdDelete size={22} />,
    },
  ];

  return (
    <Layout title="Edit profile">
      <div className="flex gap-6 w-full">
        <div className="w-1/4">
          <Sidebar
            items={tabs}
            value={activeTab}
            links
            className="sticky top-6"
            backText="Profile"
            backHref="/profile"
          />
        </div>
        <div className="w-3/4">
          <FormCard
            id="userdata"
            title="User data"
            titleIcon={<MdPerson size={22} className="text-gray-500" />}
            className="form-card mb-6"
            submitText="Save"
            submitDisabled={!dataChanged()}
            onSubmit={handleSave}
            loading={loading === "userdata"}
            status={
              saveStatus ? (
                saveStatus === "success" ? (
                  <div className="flex items-center">
                    <MdCheck size={22} className="mr-2" />
                    Saved
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <MdClose size={22} className="mr-2" />
                    {saveStatus}
                  </div>
                )
              ) : null
            }
          >
            <SelectImage
              src={
                (typeof window !== "undefined" &&
                  profileImage &&
                  URL.createObjectURL(profileImage)) ||
                user?.image ||
                "/default_profile_image.png"
              }
              onChange={setProfileImage}
              alt="Profile image"
              title="Profile image"
              subtitle="Click to select profile image"
            />
            <Input value={username} onChange={setUsername} label="Username" />
            <Input value={fullName} onChange={setFullName} label="Full name" />
            <Input value={email} onChange={setEmail} label="Email" />
          </FormCard>

          <FormCard
            id="password"
            title="Change password"
            titleIcon={<MdLock size={22} className="text-gray-500" />}
            className="form-card mb-6"
            submitText="Change"
            submitDisabled={
              !currentPassword || !newPassword || !newPasswordConfirm
            }
            onSubmit={handleChangePassword}
            loading={loading === "password"}
            status={
              changePasswordStatus ? (
                changePasswordStatus === "success" ? (
                  <div className="flex items-center">
                    <MdCheck size={22} className="mr-2" />
                    Saved
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <MdClose size={22} className="mr-2" />
                    {changePasswordStatus}
                  </div>
                )
              ) : null
            }
          >
            <Input
              type="password"
              label="Current password"
              value={currentPassword}
              onChange={setCurrentPassword}
            />
            <Input
              type="password"
              label="New password"
              value={newPassword}
              onChange={setNewPassword}
            />
            <Input
              type="password"
              label="Confirm new password"
              value={newPasswordConfirm}
              onChange={setNewPasswordConfirm}
            />
          </FormCard>
          <FormCard
            id="delete"
            title="Delete account"
            titleIcon={<MdDelete size={22} className="text-gray-500" />}
            className="form-card"
            submitText="Delete"
            submitClass={
              deleteUsername === user?.username
                ? "text-red-500 dark:text-red-400"
                : ""
            }
            submitDisabled={deleteUsername !== user?.username}
            onSubmit={handleDeleteAccount}
            loading={loading === "delete"}
            status={
              deleteStatus ? (
                deleteStatus === "success" ? (
                  <div className="flex items-center">
                    <MdCheck size={22} className="mr-2" />
                    Saved
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <MdClose size={22} className="mr-2" />
                    {deleteStatus}
                  </div>
                )
              ) : null
            }
          >
            <Input
              label="Type your username to delete account"
              value={deleteUsername}
              onChange={setDeleteUsername}
            />
          </FormCard>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
