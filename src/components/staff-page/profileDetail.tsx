import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ProfileDetail = () => {
  return (
    <div>
      <div>
        <div className="flex flex-col items-center">
          <div>
            <Avatar className="h-20 w-20 rounded-lg">
              <AvatarImage
                src="https://upload.wikimedia.org/wikipedia/commons/1/12/230601_Karina_%28aespa%29.jpg"
                alt="jimin"
              />
              <AvatarFallback className="rounded-lg">KJ</AvatarFallback>
            </Avatar>
          </div>
          <p>jimin</p>
          <p>jimin12</p>
          <p>jimin@gmail.com</p>
        </div>
        <div>
          <h2>Other Detail</h2>
          <div className="flex flex-row justify-between p-3 m-1">
            <div>
              <p>Phone Number</p>
              <p>Date of Birth</p>
              <p>Gender</p>
              <p>Address</p>
            </div>
            <div>
              <p>081927265573</p>
              <p>2002-07-25</p>
              <p>Male</p>
              <p>Jl. Mawar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
