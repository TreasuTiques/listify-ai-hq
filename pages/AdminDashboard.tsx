// Inside your new Admin page
const { user } = useAuth(); // However you handle login

if (user?.email !== "your-email@example.com") {
  return <p>Access Denied. Amigo, this is for the boss only!</p>;
}

return (
  <div>
    <h1>Sellitio Admin Panel</h1>
    <SpendingChart /> 
  </div>
);
