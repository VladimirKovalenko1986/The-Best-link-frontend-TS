import { useEffect, useState, useRef, Suspense } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { getPaymentId } from "../../payments-api.js";
import DiscussLoading from "../../components/DiscussLoading/DiscussLoading.jsx";
import PaymentInfo from "../../components/PaymentInfo/PaymentInfo.jsx";

export default function PaymentDetailsPage() {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkURLRef = useRef(location.state ?? "/payments");

  useEffect(() => {
    async function fetchPayment() {
      try {
        setError(false);
        setLoading(true);
        const data = await getPaymentId(paymentId);
        setPayment(data);
      } catch (error) {
        console.log(error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPayment();
  }, [paymentId]);

  return (
    <div>
      <h2>Payment Details</h2>
      <div>
        <Link to={backLinkURLRef.current}>Go back</Link>
      </div>
      {loading && <DiscussLoading />}
      {error && <b>Ooops! There was an error! Please reload!</b>}
      {payment && <PaymentInfo payment={payment} />}

      <ul>
        <li>
          <Link to="bank">Bank</Link>
        </li>
        <li>
          <Link to="receipt">Receipt</Link>
        </li>
      </ul>
      <Suspense fallback={<b>Loading nested route....</b>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
