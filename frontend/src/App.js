import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./view/LoginPage"
import SignUpPage from "./view/SignUpPage"
import UserProfile from "./view/UserProfile"
import PlantProfile from "./view/PlantProfile"
import EditPlantProfile from "./view/EditPlantProfile"
import ResearchWork from "./view/ResearchWork"
import VideoTutorials from "./view/VideoTutorials"
import MarketplacePage from "./view/MarketplacePage"
import PlantList from "./view/PlantList"
import TransactionPage from "./view/TransactionPage"
import DashboardPage from "./view/DashboardPage"
import PlantCareSession from "./view/PlantCareSession"
import WhichPlantQuiz from "./view/WhichPlantQuiz"
import Notification from "./view/notification"
import Diseases from "./view/Diseases"
import ProTips from "./view/ProTips"
import PlantMoodMatcher from "./view/Moodchanger"
import CommunityForumPage from "./view/CommunityForum"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<DashboardPage />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/plants' element={<PlantList />} />
        <Route path='/plant-profile/:id' element={<PlantProfile />} />
        <Route path='/edit-plant/:id' element={<EditPlantProfile />} />
        <Route path='/research-work' element={<ResearchWork />} />
        <Route path='/video-tutorials' element={<VideoTutorials />} />
        <Route path='/marketplace' element={<MarketplacePage />} />
        <Route path='/transaction' element={<TransactionPage />} />
        <Route path='/session' element={<PlantCareSession />} />
        <Route path="/which-plant-quiz" element={<WhichPlantQuiz />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/des' element={<Diseases/>} />
        <Route path='/protips' element={<ProTips />} />
        <Route path='/mood' element={<PlantMoodMatcher />} />
        <Route path='/community' element={<CommunityForumPage />} />
        {/* Add more routes as needed */}
      
      </Routes>
    </Router>
  )
}

export default App
