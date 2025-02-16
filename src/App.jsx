import '../src/sass/main.scss'
import Item from './components/Item'
import data from '../data.json'
import emptyCart from '../public/assets/images/illustration-empty-cart.svg'
import carbon from '../public/assets/images/icon-carbon-neutral.svg'
import { useReducer, useState, useEffect } from 'react'
import iconRemove from '../public/assets/images/icon-remove-item.svg'
import onderConfirmed from '../public/assets/images/icon-order-confirmed.svg'
import Modal from './components/Modal'

const initialState = {
  cart: [],
  modal: false
}

const reducer = (state, action) => {
  switch(action.type) {
    case "ADD":    
      return {
        ...state, 
        cart: [...state.cart, {...action.payload, qty: 1}]
      }  
    case "PLUS":
      const ItemQtyPlus = state.cart.map(ele => {
        if(ele.name === action.payload.name) {
          return {...ele, qty: ele.qty + 1}
        }
        return ele
      })
      return {
        ...state, 
        cart: [...ItemQtyPlus]
      }
    case "MINUS":
      const ItemQtyMinus = state.cart.map(ele => {
        if(ele.name === action.payload.name) {
          return {...ele, qty: ele.qty - 1}
        }
        return ele
      })
      return {
        ...state, 
        cart: [...ItemQtyMinus]
      }
    case "DELETE":
      const newCart = state.cart.filter(ele => {
        return ele.name !== action.payload.name
      })
      return {
        ...state, 
        cart: [...newCart]
      }
    case "MODAL":
      return {
        ...state, 
        modal: !state.modal
      } 
    case "RESET":
      return {
        cart: [],
        modale: false
      }
  }
  return state
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  function handleClose() {
    dispatch({type: 'MODAL'})
  }
  function confirm() {
    dispatch({type: 'RESET'})
    handleClose()
  }

  return (
    <>
      <main className="main__cont">
        <div className="main__cont--products">
          <h1>Desserts</h1>
          <div className="main__cont--products-list">
            {
              data.map((ele => {
                return (
                  <Item 
                    ele={ele} 
                    key={ele.name} 
                    dispatch={dispatch}
                    cart={state.cart}
                  />
                )
              }))
            }
          </div>
        </div>
        <div className="main__cont--cart">
          <div className="main__cont--cart_container">
            <h3>Your cart ({state.cart.reduce((acc, ele) => acc + ele.qty, 0)})</h3>
            <div className="main__cont--cart_container-img">
                {
                  state.cart.length < 1 ? 
                  <>
                    <img src={emptyCart} alt=""/>
                    <p>Your added items will appear here</p>
                  </> : 
                  <>
                    <ul className="item__list">
                      {state.cart.map(it => {
                        return <li className='item__list--detail' key={it.name}>
                            <div className="item__info">
                              <div className='item__info--name'>
                                <p>{it.name}</p>
                              </div>
                              <div className="item__info--price">
                                <p>{it.qty}</p>
                                <p>@{`$${it.price.toFixed(2)}`}</p>
                                <p>${(it.qty * it.price).toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="item__delete" onClick={() => dispatch({type: "DELETE", payload: it})}>
                              <img src={iconRemove} alt="" />
                            </div>

                          </li>
                      })}
                    </ul>
                    <div className="order__total">
                      <p>Order Total</p>
                      <p className='order__total--price'>${
                          state.cart.reduce((acc, ele) => acc + ele.qty * ele.price, 0).toFixed(2)
                        }</p>
                    </div>
                    <div className="carbon__message">
                      <img src={carbon} alt="" />
                      <p>This is a <span>carbon-neutral</span> delivery</p>
                    </div>
                    <button className='btn btn-order' onClick={() => dispatch({type: "MODAL"})}>Confirm Order</button>
                  </>
                }
            </div>
          </div>
        </div>
        <Modal isOpen={state.modal} onClose={handleClose}>
          <div className="confirm__order">
            <div className="confirm__order--header">
              <img src={onderConfirmed} alt="" />
              <div className="confirm__order--header-title">
                <h4>Order confirmed</h4>
                <p>We hope you enjoy your food!</p>
              </div>
            </div>
            <ul className="confirm__order--list">
              {
                state.cart.map(it => {
                  return <li key={it.name}>
                      <div className="confirm__order--list_inf">
                        <div className="item__image">
                          <img src={`${it.image.thumbnail }`} alt="" />
                          <div className='item__image--detail'>
                            <p className='item__image--detail-name'>{it.name}</p>
                            <div className='item__image--detail_price'>
                              <p className='item__image--detail_price-qty'>{it.qty}x</p>
                              <p>@{`$${it.price.toFixed(2)}`}</p>
                            </div>
                          </div>
                        </div>
                        <div className="subtotal">
                          <p>${(it.qty * it.price).toFixed(2)}</p>
                        </div>
                      </div>
                    </li>
                })
              }
            </ul>
            <div className="confirm__order--total">
              <p>Order total</p>
              <p>${state.cart.reduce((acc, ele) => acc + ele.qty * ele.price, 0).toFixed(2)}</p>
            </div>
            <button className='btn confirm__order--btn' onClick={confirm}>Start New Order</button>
          </div>
        </Modal>
      </main>
    </>
  )
}
export default App
