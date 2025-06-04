import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPayments } from "../../payments-api.js";
import DiscussLoading from "../../components/DiscussLoading/DiscussLoading.jsx";
import PaymentListApi from "../../components/PaymentListApi/PaymentListApi.jsx";
import OwnerFilter from "../../components/OwnerFilter/OwnerFilter.jsx";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSerchParams] = useSearchParams();
  const ownerParam = searchParams.get("owner") ?? "";

  const changeOwnerFilter = (newFilter) => {
    searchParams.set("owner", newFilter);
    setSerchParams(searchParams);
  };

  useEffect(() => {
    async function fetchPayments() {
      try {
        setError(false);
        setLoading(true);
        const data = await getPayments();
        setPayments(data);
      } catch (error) {
        console.log(error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, []);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) =>
      payment.author.toLowerCase().includes(ownerParam.toLowerCase())
    );
  }, [payments, ownerParam]);

  return (
    <div>
      <h2>Payments Page</h2>
      <OwnerFilter value={ownerParam} onFilter={changeOwnerFilter} />
      {loading && <DiscussLoading />}
      {error && <b>Ooops! There was an error! Please reload!</b>}
      {payments.length > 0 && <PaymentListApi items={filteredPayments} />}
    </div>
  );
}
