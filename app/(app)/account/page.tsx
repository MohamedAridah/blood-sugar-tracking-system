import UserInfoPanel from "./components/user-info-panel";
import UserBioPanel from "./components/user-bio-panel";
import UserActionsPanel from "./components/user-actions-panel";

const Account = async () => {
  return (
    <section>
      <h1 className="font-semibold text-lg">My Profile</h1>

      <UserBioPanel />

      <UserInfoPanel />

      <UserActionsPanel />
    </section>
  );
};

export default Account;
