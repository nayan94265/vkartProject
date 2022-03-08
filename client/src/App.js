import './App.css';
import { BrowserRouter as Router ,  Switch,Route } from 'react-router-dom';
import Header from './Components/Header/Header'
// import Banner from './Components/Home/Banner'
import Home from './Components/Home'
import Cart from './Components/Cart/Cart'
import TemplateProvider from './Templates/TemplateProvider.js'
import ContextProvider from './context/ContextProvider';
import DetailView from './Components/ItemDetails/DetailView'
import UserDetailView from './Components/ItemDetails/UserDetailView'
import {Box} from '@material-ui/core'
import Studio from './Components/UploadStudio/Studio.js'

//import ProductShoeModel from './Components/ProductModels/ProductShoeModel.js'
import ShoeModel from './Components/Models/ShoeModel';
import UploadModelDetails from './Components/UploadStudio/UploadModelDetails';
import ModelRepository from './Components/UploadStudio/ModelRepository';
import HeadPhoneModel from './Components/ProductModels/HeadPhoneModel';

import WatchModel from './Components/ProductModels/WatchModel';

function App() {
  return (
    <TemplateProvider>
      <ContextProvider>
    <Router>
      
      <Box style={{marginTop:54}}>
          <Switch>
            <Route exact path= '/' component={Home} />
            <Route exact path= '/cart' component={Cart} />
            {/* <Route exact path= '/product/:id' component={Product} /> */}
            <Route exact path= '/product/:id' component={DetailView} />
            <Route exact path= '/userProduct/:id' component={UserDetailView} />
            {/* <Route component={NotFound} />  */}
            <Route exact path= '/VkartStudio/:id' component={Studio} />
            {/* <Route exact path= '/productDetialView/:id' component={ProductDetialView} /> */}
             <Route  path= '/shoe' component={UploadModelDetails} /> 
             <Route  path= '/ModelRepo' component={ModelRepository} /> 
             <Route  path= '/ProductReview' component={ShoeModel} /> 
             <Route exact path= '/headphone' component={HeadPhoneModel}/>
             
          <Route path="/watch" component={WatchModel}/>
           
          </Switch>
          </Box>
      </Router>
      </ContextProvider>
      </TemplateProvider>
  );
}

export default App;
