import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Cart } from './Cart';
import type { CartItem, ProdData } from '../Types/ProdData';
import { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { SortMenu } from './SortMenu';
import { Categories } from './Categories';
import { fetchProducts, getCategoryList } from '../apis/api';
import { Box, Button } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { AIAssistant } from './AIAssistant';

interface HeaderProps {
  totalItems: number
  cart:CartItem[]
  setCart: (item : CartItem[]) => void
  search: string
  setSearch: (value: string) => void
  sortType: string
  setSortType:(value:string) => void
  category : string
  setCategory :(value : string) => void
}

export const Header = ({totalItems , cart, setCart,search,setSearch,setSortType,sortType, category, setCategory}:HeaderProps) => {
    const [openCart, setOpenCart] = useState(false);
    const [categoriesList, setCategoriesList] = useState<string[]>([]);
    const [helpModal, setHelpModal] = useState(false);
    const [allProducts, setAllProducts] = useState<ProdData[]>([]); 
    useEffect(() => {
        fetchCategoriesList();
    },[])

    useEffect(() => {
        getAllProducts();
    },[])

    const getAllProducts = async() => {
            const data = await fetchProducts(194,0);
            setAllProducts(data.products);
        }
        
    const fetchCategoriesList = async() => {
        const data = await getCategoryList();
        setCategoriesList(data);
    }
    return(
      <div className="header">
      <div className="shop-title">Mini Shop</div>

      <SearchBar search={search} setSearch={setSearch}/>
      <div className="header-actions">
        <Categories category={category} setCategory={setCategory} categoriesList={categoriesList}/>
        <SortMenu sortType={sortType} setSortType={setSortType}/>
        
        <Box sx={{display:"flex"}}>
        <Button
                variant="text"
                size="small"
                sx={{ textTransform: "none" ,}}
                onClick={() => setHelpModal(true)}
            >
                <span style={{fontSize:15 , fontWeight : 600}}>Help</span>
              <HelpIcon style={{fontSize:20}}/>  
            </Button>

            <button
              className="cart-button"
              title="My Cart"
              onClick={() => setOpenCart(true)}
            >
        <ShoppingCartIcon />
        <div style={{fontSize:"20px",marginLeft:"3px"}}>{totalItems}</div>
      </button>
      </Box>
      
      </div>
      {openCart && (
        <>
        <div
          className="cart-overlay"
          onClick={() => setOpenCart(false)}
        />
        <div className="cart-dropdown">
        <Cart cart={cart} setCart={setCart} />
        </div>
        </>
        )}
      {helpModal && ( <AIAssistant helpModal={helpModal} setHelpModal={setHelpModal} cart={cart} allProducts={allProducts}/>)}
    </div>
    )
}