import RingLoader from "react-spinners/RingLoader";

import "./index.css";

function Loader() {
  return (
    <div className="spinner-loader">
      <RingLoader
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
        margin={2}
        color="#ef8843"
        fontWeight={900}
      />
    </div>
  );
}
export default Loader;
