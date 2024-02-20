const order_en = {
  list: {
    title: "Orders",
    filter: {
      placeholder: {
        search: "Search order number",
        status: "Order status",
        paymentMethod: "Payment method",
        paymentStatus: "Payment status",
      },
    },
  },
  form: {
    addTitle: "Create order",
    editTitle: "Update order",
    select: "Select product",
    create: "Create new product",
    customer: "Customer",
    setting: "Setting",
    orderStatus: "Order status",
    paymentMethods: "Payment methods",
    quantity: "Amount of products",
    shipmentFee: "Shipment fee",
    tax: "VAT(10%)",
    totalPrice: "Total products price",
    totalPricePreTax: "Total pre-tax price",
    totalPayment: "Total payment",
    productNote: "Please select or create product for order",
    tooltipNote: "Delete shipment infomation",
    addShipment: "Add shipment",
    shipmentInfo: "Shipment infomation",
    shipmentFeeNote:
      "Note about shipping fee: If the total product price is less than 100,000. Total price before tax will include an additional 50,000 for shipping fee",
    received: "Receive goods",
    removeShipmentModal: {
      confirmModalTitle: "Remove shipment",
      confirmModalContent: "Are you wish to remove this infomation",
      confirmModalNote: "All infomation after remove can not be recovered",
    },
  },
};

export default order_en;
