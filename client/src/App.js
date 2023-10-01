import './App.css';
import '../src/assets/css/style.scss'
import { ConfigProvider } from "antd";
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Poppins",
            colorPrimary: "#fdb913",
            colorTextPlaceholder: "#000",
          },
        }}
      >
        <AllRoutes />
      </ConfigProvider>
      {/* <AllRoutes /> */}
    </div>
  );
}

export default App;
