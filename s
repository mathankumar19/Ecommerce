.checkout-page {
  padding: 20px 0;
}

.checkout-page h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
}

.checkout-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.checkout-form {
  flex: 2;
  min-width: 300px;
}

.checkout-form h2 {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.form-row .form-group {
  flex: 1;
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.place-order-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.place-order-btn:hover {
  background-color: #218838;
}

.order-summary {
  flex: 1;
  min-width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  align-self: flex-start;
}

.order-summary h2 {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.summary-items {
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.item-info {
  display: flex;
}

.quantity {
  margin-right: 10px;
  font-weight: bold;
}

.price {
  font-weight: bold;
}

.summary-totals {
  margin-top: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.summary-row.total {
  font-weight: bold;
  font-size: 1.2rem;
  border-bottom: none;
}

.back-to-cart {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #e91e63;
  text-decoration: none;
}

.back-to-cart:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .checkout-container {
    flex-direction: column;
  }

  .form-row {
    flex-direction: column;
    gap: 20px;
  }
}