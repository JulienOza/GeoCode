import { useEffect, useState } from "react";
import "./MyBookingPage.scss";
import BackgroundAsideType from "../../components/BackgroundAsideType/BackgroundAsideType";
import MyBooking from "../../components/MyBooking/MyBooking";
import useStore from "../../store/AuthProvider";

function MyBookingPage() {
  const { auth } = useStore();

  const [data, setData] = useState();
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const fetchBookByUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${
            auth.user.id
          }/booking`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const stationData = await response.json();

        setData(stationData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBookByUser();
  }, [!data, deleted]);

  return (
    <BackgroundAsideType title="Mes réservations">
      {data &&
        data.map((userBook) => (
          <MyBooking
            key={userBook.bookId}
            userBook={userBook}
            deleted={deleted}
            setDeleted={setDeleted}
          />
        ))}
    </BackgroundAsideType>
  );
}

export default MyBookingPage;
