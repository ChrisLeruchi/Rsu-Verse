import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HeaderLayout } from './components/navigation/HeaderLayout';
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  const handlePlusClick = () => {
    setActiveTab("plus")
    navigate("/plus")
  }

  return (
    <>
      <Routes>
        <Route
          element={
            <HeaderLayout
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handlePlusClick = {handlePlusClick}
            />
          }
        >
          <Route index element={<div className="p-6 text-xs font-mono text-white/40">Home Feed Frame Ready.</div>} />
          <Route path="/market" element={<div className="p-6 text-xs font-mono text-white/40">Marketplace Frame Ready.</div>} />
          <Route path="/user" element={<div className="p-6 text-xs font-mono text-white/40">User Profile Frame Ready.</div>} />
          <Route path="/notifications" element={<div className="p-6 text-xs font-mono text-white/40">Notifications Frame Ready.</div>} />
          <Route path="/menu" element={<div className="p-6 text-xs font-mono text-white/40">Menu Settings Frame Ready.</div>} />
        </Route>
        <Route
          path="/plus"
          element={
            <div className="min-h-screen bg-ink p-8 flex flex-col justify-between">
              <div className="text-sm font-mono text-rose">Transmission Engine Initialization Block.</div>
              <button onClick={() => { setActiveTab("home"); navigate("/"); }} className="text-xs text-white/40 text-left underline">Abort Stream</button>
            </div>
          }
        />
      </Routes>
    </>
  )
}

export default App
