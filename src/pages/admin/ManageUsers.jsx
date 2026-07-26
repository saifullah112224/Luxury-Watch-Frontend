import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Link } from "react-router-dom";
import {
  getUsers,
  updateUserRole,
  deleteUser,
} from "../../api/userApi";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

const handleRole = (user) => {
  setSelectedUser(user);
  setSelectedRole(user.role);
};

  const handleDelete = async (id) => {

    const ok = window.confirm(
      "Delete this user?"
    );

    if (!ok) return;

    try {

      await deleteUser(id);

      loadUsers();

    } catch (err) {
      console.log(err);
    }
  };

  const saveRole = async () => {
  try {

    await updateUserRole(
      selectedUser.id,
      selectedRole
    );

    setSelectedUser(null);

    loadUsers();

  } catch (err) {
    console.log(err);
  }
};

  const filteredUsers = users.filter((user) => {

    return (
      user.full_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      user.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  });

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-28">

  <Link
    to="/admin"
    className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-yellow-400 hover:text-black text-white px-6 py-3 rounded-xl font-bold transition"
  >
    ← Back to Dashboard
  </Link>

</div>

      <div className="min-h-screen bg-black text-white pt-32 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-yellow-400 text-center mb-10">
            Manage Users
          </h1>

          <div className="flex justify-between items-center mb-8">

            <input
              type="text"
              placeholder="Search User..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full md:w-96 bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-3 outline-none"
            />

            <div className="ml-5 text-xl">
              Total Users:
              <span className="text-yellow-400 ml-2 font-bold">
                {filteredUsers.length}
              </span>
            </div>

          </div>

          <div className="overflow-x-auto rounded-3xl">

            <table className="w-full bg-zinc-900 overflow-hidden">

              <thead className="bg-yellow-400 text-black">

                <tr>

                  <th className="p-4 text-left">
                    #
                  </th>

                  <th className="p-4 text-left">
                    User ID
                  </th>

                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th className="p-4 text-left">
                    Email
                  </th>

                  <th className="p-4 text-left">
                    Phone
                  </th>

                  <th className="p-4 text-left">
                    Address
                  </th>

                  <th className="p-4 text-left">
                    Role
                  </th>

                  <th className="p-4 text-left">
                    Joined
                  </th>

                  <th className="p-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredUsers.length === 0 ? (

                  <tr>

                    <td
                      colSpan="9"
                      className="text-center py-10 text-gray-400"
                    >
                      No users found.
                    </td>

                  </tr>

                ) : (

                  filteredUsers.map((user, index) => (

                    <tr
                      key={user.id}
                      className={`border-b border-zinc-800 hover:bg-zinc-800 transition ${
                        index % 2 === 0
                          ? "bg-zinc-900"
                          : "bg-zinc-950"
                      }`}
                    >

                      <td className="p-4 font-bold text-yellow-400">
                        {index + 1}
                      </td>

                      <td className="p-4 text-gray-400 text-xs">
                        {user.id.slice(0, 8)}...
                      </td>

                      <td className="p-4 font-semibold">
                        {user.full_name}
                      </td>

                      <td className="p-4">
                        {user.email}
                      </td>

                      <td className="p-4">
                        {user.phone}
                      </td>

                      <td className="p-4 max-w-xs truncate">
                        {user.address}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            user.role === "admin"
                              ? "bg-green-600 text-white"
                              : "bg-blue-600 text-white"
                          }`}
                        >
                          {user.role}
                        </span>

                      </td>

                      <td className="p-4">
                        {new Date(
                          user.created_at
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-4">

                        <div className="flex justify-center gap-3">

                          <button
                            onClick={() =>
                              handleRole(user)
                            }
                            className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-bold transition"
                          >
                            Update
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(user.id)
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold transition"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {selectedUser && (

<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

  <div className="bg-zinc-900 w-[420px] rounded-2xl p-8">

    <h2 className="text-3xl font-bold text-yellow-400 mb-6">
      Update User
    </h2>

    <div className="space-y-4">

      <div>

        <p className="text-gray-400">
          Name
        </p>

        <p className="font-bold">
          {selectedUser.full_name}
        </p>

      </div>

      <div>

        <p className="text-gray-400">
          Email
        </p>

        <p>
          {selectedUser.email}
        </p>

      </div>

      <div>

        <p className="text-gray-400 mb-2">
          Role
        </p>

        <select
          value={selectedRole}
          onChange={(e) =>
            setSelectedRole(e.target.value)
          }
          className="w-full bg-black border border-zinc-700 rounded-lg p-3"
        >
          <option value="customer">
            Customer
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

      </div>

    </div>

    <div className="flex justify-end gap-3 mt-8">

      <button
        onClick={() => setSelectedUser(null)}
        className="bg-zinc-700 hover:bg-zinc-600 px-5 py-2 rounded-lg"
      >
        Cancel
      </button>

      <button
        onClick={saveRole}
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-bold"
      >
        Save Changes
      </button>

    </div>

  </div>

</div>

)}

      <Footer />
    </>
  );
}

export default ManageUsers;