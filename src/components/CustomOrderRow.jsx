import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerOrderRow = ({ customer, lines, createdAt, hide, id, state,fulfillments }) => {
  const [buttonText, setButtonText] = useState("");
  const [confirmationEnabled, setConfirmationEnabled] = useState(true);
  const navigate = useNavigate();
  const [textColor,setColor]=useState("text-blue-500")

  useEffect(() => {
    // Set button text and confirmation state based on the order state
    if(fulfillments?.[0]?.id && state=="PaymentSettled"){
      setButtonText("Approved");
      setConfirmationEnabled(false);

    }else{

    
    switch (state) {
      case "Delivered":
        setButtonText("Delivered");
        setColor("text-green-400")
        setConfirmationEnabled(false);
        break;
      case "Cancelled":
        setButtonText("Cancelled");
        setColor("text-red-400")

        setConfirmationEnabled(false);
        break;
      case "PaymentSettled":
        setButtonText("Approval Required");
        setConfirmationEnabled(true);
        break;
      default:
        setButtonText("Approved");

        setConfirmationEnabled(false);
    }
  }
  }, [state,fulfillments]);

  const handleClick = () => {
    navigate(`/order/${id}`);
  };

  const handleConfirm = () => {
    if (state === "PaymentSettled"  ) {
      setButtonText("Approved");
      setConfirmationEnabled(false);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }

  return (
    <tr >
      <td className="pl-2 pr-4 py-4 whitespace-nowrap cursor-pointer" onClick={handleClick}>
        <div className="text-card-foreground font-semibold">{`${customer?.firstName} ${customer?.lastName}`}</div>
        <div className="text-muted-foreground">{customer?.emailAddress}</div>
      </td>
      <td className=" text-center pr-4 py-4 whitespace-nowrap cursor-pointer" onClick={handleClick}>
        <div className="text-card-foreground ">{lines?.[0]?.productVariant?.name}</div>
      </td>
      <td className="pr-4 py-4 whitespace-nowrap text-center text-card-foreground cursor-pointer" onClick={handleClick}>#{id}</td>
      <td className="  text-center pr-4 py-4 whitespace-nowrap text-card-foreground cursor-pointer" onClick={handleClick}>{formatDate(createdAt)}</td>
      <td className="pr-2 py-4 text-center whitespace-nowrap cursor-pointer" onClick={handleClick}>
        <span
          className={`py-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            state === "PaymentSettled"
              ? "bg-orange-100 text-orange-500"
              : state === "Cancelled"
              ? "bg-red-100 text-red-500"
              : "bg-green-100 text-green-500"
          }`}
        >
          <div
            className={`w-2 h-2 m-auto mr-1 rounded-full ${
              state === "PaymentSettled"
                ? "bg-orange-500"
                : state === "Cancelled"
                ? "bg-red-500"
                : "bg-green-500"
            }`}
          ></div>
          {state}
        </span>
      </td>
      <td className={`${hide ? "hidden" : "block"} ${textColor} text-center py-4 whitespace-nowrap`}>
        {buttonText && (
          <button
            onClick={handleConfirm}
            disabled={!confirmationEnabled}
            className={`px-4 py-2 bg-transparent border-primary ${
              confirmationEnabled
                ? "border border-blue-500 hover:bg-blue-500 hover:text-white"
                : "cursor-not-allowed opacity-50"
            } rounded-lg`}
          >
            {buttonText}
          </button>
        )}
      </td>
    </tr>
  );
};

export default CustomerOrderRow;
