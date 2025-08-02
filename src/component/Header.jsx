// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import jsPDF from "jspdf";

// const Billing = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [customer, setCustomer] = useState("");
//   const [customerPhone, setCustomerPhone] = useState("");
//   const [invoiceNo, setInvoiceNo] = useState("");
//   const [date, setDate] = useState("");
//   const [vatRate, setVatRate] = useState(5);
//   const [items, setItems] = useState([
//     { name: "", qty: 1, price: 0, discount: 0 },
//   ]);
//   const [showBill, setShowBill] = useState(false);

//   useEffect(() => {
//     setDate(new Date().toISOString().slice(0, 10));
//     // setInvoiceNo("INV-" + Math.floor(1000 + Math.random() * 9000));
//   }, []);

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...items];
//     if (field === "qty")
//       newItems[index][field] = Math.max(1, parseInt(value) || 1);
//     else if (field === "discount")
//       newItems[index][field] = Math.min(
//         100,
//         Math.max(0, parseFloat(value) || 0)
//       );
//     else if (field === "price") newItems[index][field] = parseFloat(value) || 0;
//     else newItems[index][field] = value;
//     setItems(newItems);
//   };

//   const addItem = () => {
//     setItems([...items, { name: "", qty: 1, price: 0, discount: 0 }]);
//   };

//   const removeItem = (index) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   const getTotal = () =>
//     items
//       .reduce((sum, item) => {
//         const subtotal = item.qty * item.price;
//         const discount = (item.discount / 100) * subtotal || 0;
//         return sum + (subtotal - discount);
//       }, 0)
//       .toFixed(2);

//   const getVAT = () => ((parseFloat(getTotal()) * vatRate) / 100).toFixed(2);
//   const getGrandTotal = () =>
//     (parseFloat(getTotal()) + parseFloat(getVAT())).toFixed(2);

//   const [warranty, setWarranty] = useState(false);


//   const downloadReceipt = () => {
//     const pdf = new jsPDF();
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const margin = 10;
//     const centerX = pageWidth / 2;

//     pdf.setFontSize(18);
//     pdf.setTextColor("#ea580c");
//     pdf.text("Company Name", centerX, 20, { align: "center" });

//     pdf.setFontSize(11);
//     pdf.setTextColor("#000");
//     pdf.text("www.arafat-tech.LTD.com", centerX, 27, { align: "center" });

//     pdf.setDrawColor(200);
//     pdf.line(margin, 32, pageWidth - margin, 32);

//     pdf.setFontSize(12);
//     pdf.text(`Customer: ${customer || "-"}`, margin, 42);
//     pdf.text(`Phone: ${customerPhone || "-"}`, margin, 50);
//     pdf.text(`Invoice No: ${invoiceNo}`, pageWidth - 70, 42);
//     pdf.text(`Date: ${date}`, pageWidth - 70, 50);

//     // Columns X positions
//     const colX = {
//       name: margin,
//       qty: pageWidth * 0.55,
//       price: pageWidth * 0.65,
//       discount: pageWidth * 0.78,
//       total: pageWidth - margin,
//     };

//     // Header row
//     pdf.setFontSize(12);
//     pdf.text("Item", colX.name, 65);
//     pdf.text("Qty", colX.qty, 65);
//     pdf.text("Price", colX.price, 65);
//     pdf.text("Discount %", colX.discount, 65);
//     pdf.text("Total", colX.total, 65, { align: "right" });

//     let y = 72;
//     const lineHeight = 6;

//     items.forEach((item) => {
//       const subtotal = item.qty * item.price;
//       const discount = (item.discount / 100) * subtotal || 0;
//       const total = (subtotal - discount).toFixed(2);

//       pdf.setFontSize(11);

//       // Wrap long item names properly
//       const splitName = pdf.splitTextToSize(
//         item.name || "-",
//         colX.qty - colX.name - 2
//       );

//       splitName.forEach((line, i) => {
//         if (y > 270) {
//           pdf.addPage();
//           y = 20;
//         }
//         pdf.text(line, colX.name, y);

//         // Only add qty, price, discount, total on first line of item name
//         if (i === 0) {
//           pdf.text(item.qty.toString(), colX.qty, y);
//           pdf.text(item.price.toFixed(2), colX.price, y);
//           pdf.text(item.discount.toString(), colX.discount, y);
//           pdf.text(total.toString(), colX.total, y, { align: "right" });
//         }
//         y += lineHeight;
//       });

//       if (y > 270) {
//         pdf.addPage();
//         y = 20;
//       }
//     });

//     // Line before totals
//     pdf.line(margin, y + 2, pageWidth - margin, y + 2);
//     y += 12;

//     // Totals
//     pdf.setFontSize(12);
//     pdf.text(`Subtotal: ${getTotal()} Tk`, pageWidth - margin, y, {
//       align: "right",
//     });
//     y += 8;
//     pdf.text(`VAT (${vatRate}%): ${getVAT()} Tk`, pageWidth - margin, y, {
//       align: "right",
//     });
//     y += 8;

//     pdf.setFontSize(14);
//     pdf.setTextColor("#ea580c");
//     pdf.text(`Grand Total: ${getGrandTotal()} Tk`, pageWidth - margin, y, {
//       align: "right",
//     });




//     if (warranty) {
//   y += 20;
//   pdf.setFontSize(12);
//   pdf.setTextColor("#92400e");
//   pdf.setFillColor(255, 249, 195);
//   pdf.rect(margin, y, pageWidth - margin * 2, 38, 'F');

//   pdf.setTextColor("#000");
//   pdf.setFontSize(11);
//   const warrantyLines = [
//     "Warranty Claim Instructions:",
//     "1. Please retain this invoice as proof of purchase for warranty service.",
//     "2. The warranty is valid for 6 months from the purchase date.",
//     "3. It covers only manufacturer defects and not physical or water damage.",
//     "4. Any tampering or unauthorized repairs will void the warranty.",
//     "5. To claim warranty, visit our service center with this receipt and the original product."
//   ];
//   warrantyLines.forEach((line, i) => {
//     pdf.text(line, margin + 2, y + 6 + i * 6);
//   });
//   y += warrantyLines.length * 6 + 4;
// }


//     y += 20;
// pdf.setFontSize(12);
// pdf.setTextColor("#000");
// pdf.text("Customer Signature", 20, y);
// pdf.text("Authorized Signature", pageWidth - 80, y);

// pdf.line(20, y + 2, 70, y + 2); // customer signature line
// pdf.line(pageWidth - 80, y + 2, pageWidth - 20, y + 2); // authorized signature line

//     pdf.save(`${invoiceNo}_receipt.pdf`);

//     // Reset form after download
//     setCustomer("");
//     setCustomerPhone("");
//     setVatRate(5);
//     setItems([{ name: "", qty: 1, price: 0, discount: 0 }]);
//     setInvoiceNo("INV-" + Math.floor(1000 + Math.random() * 9000));
//     setDate(new Date().toISOString().slice(0, 10));
//     setShowBill(false);
//   };

//   const buttonClass = darkMode
//     ? { backgroundColor: "#374151", color: "#fff", cursor: "pointer" }
//     : { backgroundColor: "#ea580c", color: "#fff", cursor: "pointer" };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: darkMode ? "#111827" : "#fff",
//         color: darkMode ? "#fff" : "#000",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 16,
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -60 }}
//         animate={{ opacity: 1, y: 0 }}
//         style={{
//           borderRadius: 24,
//           boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
//           padding: 24,
//           maxWidth: 700,
//           width: "100%",
//           border: "1px solid #ccc",
//           backgroundColor: darkMode ? "#1f2937" : "#fff",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginBottom: 20,
//           }}
//         >
//           <h2 style={{ fontSize: 28, color: "#ea580c", margin: 0 }}>
//             Billing System ARAFAT-LTD
//           </h2>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             style={{
//               padding: "6px 12px",
//               borderRadius: 8,
//               border: "1px solid",
//               backgroundColor: "transparent",
//               color: darkMode ? "#fff" : "#000",
//               cursor: "pointer",
//             }}
//           >
//             {darkMode ? "☀️ Light" : "🌙 Dark"}
//           </button>
//         </div>

//         <input
//           type="text"
//           placeholder="Customer Name"
//           value={customer}
//           onChange={(e) => setCustomer(e.target.value)}
//           style={{
//             width: "100%",
//             padding: 12,
//             marginBottom: 16,
//             borderRadius: 12,
//             border: "1px solid #ccc",
//             fontSize: 16,
//           }}
//         />

//         <input
//           type="number"
//           placeholder="Customer Phone Number"
//           value={customerPhone}
//           onChange={(e) => setCustomerPhone(e.target.value)}
//           style={{
//             width: "100%",
//             padding: 12,
//             marginBottom: 16,
//             borderRadius: 12,
//             border: "1px solid #ccc",
//             fontSize: 16,
//           }}
//         />

//         <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4">
//          <input
//       type="text"
//       value={invoiceNo}
//       onChange={(e) => setInvoiceNo(e.target.value)}
//       placeholder="Invoice No"
//       style={{
//         flex: 1,
//         padding: 12,
//         borderRadius: 12,
//         border: "1px solid #ccc",
//         backgroundColor: "#f3f4f6",
//         fontSize: 16,
//       }}
//     />
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             style={{
//               flex: 1,
//               padding: 12,
//               borderRadius: 12,
//               border: "1px solid #ccc",
//               fontSize: 16,
//             }}
//           />
//         </div>

//         {items.map((item, index) => (
//           <div
//             key={index}
//             style={{
//               display: "flex",
//               gap: 12,
//               marginBottom: 12,
//               alignItems: "center",
//               flexWrap: "wrap",
//             }}
//           >
//             <input
//               type="text"
//               placeholder="Item Name"
//               value={item.name}
//               onChange={(e) => handleItemChange(index, "name", e.target.value)}
//               style={{
//                 flex: "1 1 40%",
//                 padding: 10,
//                 borderRadius: 12,
//                 border: "1px solid #ccc",
//                 fontSize: 16,
//               }}
//             />
//             <input
//               type="number"
//               placeholder="Qty"
//               value=""
//               onChange={(e) => handleItemChange(index, "qty", e.target.value)}
//               style={{
//                 flex: "1 1 15%",
//                 padding: 10,
//                 borderRadius: 12,
//                 border: "1px solid #ccc",
//                 fontSize: 16,
//               }}
//             />

//             <input
//               type="number"
//               placeholder="Price"
//               value={item.price === 0 ? "" : item.price}
//               onChange={(e) => handleItemChange(index, "price", e.target.value)}
//               style={{
//                 flex: "1 1 20%",
//                 padding: 10,
//                 borderRadius: 12,
//                 border: "1px solid #ccc",
//                 fontSize: 16,
//               }}
//             />
//             <input
//               type="number"
//               placeholder="Discount %"
//               value={item.discount === 0 ? "" : item.discount}
//               onChange={(e) =>
//                 handleItemChange(index, "discount", e.target.value)
//               }
//               style={{
//                 flex: "1 1 20%",
//                 padding: 10,
//                 borderRadius: 12,
//                 border: "1px solid #ccc",
//                 fontSize: 16,
//               }}
//             />

//             <button
//               onClick={() => removeItem(index)}
//               style={{
//                 fontSize: 24,
//                 color: "red",
//                 background: "transparent",
//                 border: "none",
//                 cursor: "pointer",
//               }}
//               aria-label={`Remove item ${index + 1}`}
//             >
//               &times;
//             </button>
//           </div>
//         ))}

//         <button
//           onClick={addItem}
//           style={{
//             ...buttonClass,
//             padding: "12px 24px",
//             borderRadius: 12,
//             fontWeight: "bold",
//             width: "100%",
//             marginBottom: 20,
//             border: "none",
//           }}
//         >
//           + Add Item
//         </button>

//        <input
//   id="vat-input"
//   type="number"
//   placeholder="VAT (%)"
//   onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
//   style={{
//     width: "100%",
//     padding: 12,
//     borderRadius: 12,
//     border: "1px solid #ccc",
//     fontSize: 16,
//     marginBottom: 15,
//   }}
//   aria-label="VAT Percentage"
//   min={0}
//   max={100}
// />

// <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4">
//   {/* Generate Bill Button */}
//   <motion.button
//     whileHover={{ scale: 1.05 }}
//     onClick={() => setShowBill(true)}
//     style={{
//       ...buttonClass,
//       padding: "16px",
//       borderRadius: 12,
//       fontWeight: "bold",
//       width: "100%",
//       border: "none",
//       height: "100%",
//     }}
//     aria-label="Generate Bill"
//   >
//     Generate Bill
//   </motion.button>

//   {/* Warranty Checkbox */}
//   <div
//     style={{
//       display: "flex",
//       alignItems: "center",
//       border: "1px solid #ccc",
//       borderRadius: 12,
//       padding: "12px 16px",
//       height: "100%",
//     }}
//   >
//     <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
//       <input
//         type="checkbox"
//         checked={warranty}
//         onChange={(e) => setWarranty(e.target.checked)}
//       />
//       Include Warranty Claim Instructions
//     </label>
//   </div>
// </div>


//         {showBill && (
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.4 }}
//             style={{
//               backgroundColor: darkMode ? "#111827" : "#ffffff",
//               color: darkMode ? "#ffffff" : "#000000",
//               border: "1px solid #ccc",
//               borderRadius: 16,
//               padding: 24,
//               width: "100%",
//               maxWidth: 600,
//               marginTop: 24,
//             }}
//             aria-live="polite"
//           >
//             <div style={{ textAlign: "center", marginBottom: 24 }}>
//               <h3 style={{ fontSize: "1.5rem", color: "#ea580c", margin: 0 }}>
//                 Company Name
//               </h3>
//               <p style={{ fontSize: 12, color: "#666", margin: 0 }}>
//                 www.arafat-tech.LTD.com
//               </p>
//               <hr style={{ margin: "16px 0", borderColor: "#ccc" }} />
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 fontSize: 12,
//                 marginBottom: 16,
//                 flexWrap: "wrap",
//                 gap: 12,
//               }}
//             >
//               <div>
//                 <strong>Customer:</strong> {customer || "-"}
//               </div>
//               <div>
//                 <strong>Phone:</strong> {customerPhone || "-"}
//               </div>
//               <div>
//                 <strong>Invoice:</strong> {invoiceNo}
//               </div>
//               <div>
//                 <strong>Date:</strong> {date}
//               </div>
//             </div>

//             <ul style={{ paddingLeft: 0, listStyle: "none", fontSize: 14 }}>
//               {items.map((item, index) => {
//                 const subtotal = item.qty * item.price;
//                 const discount = (item.discount / 100) * subtotal || 0;
//                 const total = (subtotal - discount).toFixed(2);
//                 return (
//                   <li
//                     key={index}
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       marginBottom: 8,
//                     }}
//                   >
//                     <span>
//                       {item.name || "-"} x {item.qty} <br />
//                       <small>
//                         Price: {item.price} Tk, Discount: {item.discount}%
//                       </small>
//                     </span>
//                     <span>{total} Tk</span>
//                   </li>
//                 );
//               })}
//             </ul>

//             <hr style={{ margin: "16px 0", borderColor: "#ccc" }} />
//             <p style={{ textAlign: "right" }}>Subtotal: {getTotal()} Tk</p>
//             <p style={{ textAlign: "right" }}>
//               VAT ({vatRate}%): {getVAT()} Tk
//             </p>
//             <p style={{ textAlign: "right", fontWeight: "bold" }}>
//               Grand Total: {getGrandTotal()} Tk
//             </p>



//             <div
//   style={{
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: 40,
//     fontSize: 12,
//     color: "#444",
//     flexWrap: "wrap",
//     gap: 20,
//   }}
// >

// {warranty && (
//   <div
//     style={{
//       marginTop: 24,
//       padding: "12px",
//       backgroundColor: "#fef9c3",
//       borderRadius: 8,
//       fontSize: 13,
//       color: "#92400e",
//       border: "1px solid #fde68a",
//     }}
//   >
//     <strong>Warranty Claim Instructions:</strong>
//     <ul style={{ paddingLeft: 20, marginTop: 8 }}>
//       <li>1.Please retain this invoice as proof of purchase for warranty service.</li>
//       <li>2.The warranty is valid for 6 months from the purchase date.</li>
//       <li>3.It covers only manufacturer defects and not physical or water damage.</li>
//       <li>4.Any tampering or unauthorized repairs will void the warranty.</li>
//       <li>5.To claim warranty, visit our service center with this receipt and the original product.</li>
//     </ul>
//   </div>
// )}




//   <div style={{ textAlign: "center" }}>
//     <div
//       style={{
//         borderBottom: "1px solid #aaa",
//         width: 140,
//         margin: "0 auto 4px",
//       }}
//     ></div>
//     <span>Customer Signature</span>
//   </div>

//   <div style={{ textAlign: "center" }}>
//     <div
//       style={{
//         borderBottom: "1px solid #aaa",
//         width: 140,
//         margin: "0 auto 4px",
//       }}
//     ></div>
//     <span>Authorized Signature</span>
//   </div>
// </div>


//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               onClick={downloadReceipt}
//               style={{
//                 marginTop: 24,
//                 padding: "12px 24px",
//                 backgroundColor: "#2563eb",
//                 color: "white",
//                 borderRadius: 12,
//                 border: "none",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//                 width: "100%",
//               }}
//               aria-label="Download PDF Receipt"
//             >
//               Download PDF
//             </motion.button>
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default Billing;


import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTimes,
  FaInstagram,
  FaBars,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import mangoImg from "../assets/logo.png"; // Your mango logo image
import HomePage from "../pages/HomePage";

const navLinkStyle =
  "transition-transform duration-200 transform hover:text-blue-600 hover:scale-105";

const Header = () => {
  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-3");
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  return (
    <>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
        className="fixed bg-transparent top-0 left-0 right-0 z-50  px-[5%]"
      >
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center">
            <div className="navbar mt-4 px-4 md:px-10 w-full max-w-screen-xl mx-auto backdrop-blur-md text-black shadow shadow-blue-100 rounded-4xl py-2 flex justify-between items-center hover:bg-white">
              <Link to="/">
                <motion.img
                  src={mangoImg}
                  className="h-15 w-auto"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </Link>

              <div className="hidden lg:flex items-center gap-6">
                <ul className="menu menu-horizontal text-lg gap-4">
                  {[
                    { to: "/", label: "Home" },
                    // { to: "/offers", label: "Offers" },
                    { to: "/aboutus", label: "Billing" },
                    { to: "/contact", label: "Idendity" },
                  ].map(({ to, label }) => (
                    <li key={to}>
                      <Link to={to} className={navLinkStyle}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile Drawer Toggle */}
              <div className="lg:hidden">
                <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                  <FaBars className="h-6 w-5" />
                </label>
              </div>
            </div>

            <div className="h-[90px]"></div>
          </div>

          {/* Drawer Sidebar */}
          <div className="drawer-side z-50">
            <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
            <div className="bg-white text-black h-full w-full flex flex-col justify-between items-center py-5 px-6 relative">
              <label
                htmlFor="my-drawer-3"
                className="absolute right-6 top-6 text-2xl cursor-pointer"
              >
                <FaTimes />
              </label>

              <ul className="flex flex-col items-center gap-6 text-xl mt-10">
                {[
                 { to: "/", label: "Home" },
                    // { to: "/offers", label: "Offers" },
                    { to: "/aboutus", label: "Billing" },
                    { to: "/contact", label: "Idendity" },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className={navLinkStyle} onClick={closeDrawer}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Icons */}
              <div className="w-full flex justify-center items-center px-4 mt-10">
                <div className="flex gap-4 text-2xl mt-[-150px]">
                  {[
                    {
                      href: "https://www.instagram.com/mynagad/?hl=en",
                      icon: <FaInstagram />,
                    },
                    {
                      href: "https://www.facebook.com/share/1Bwbu4CZEw/",
                      icon: <FaFacebookF />,
                    },
                    {
                      href: "https://www.youtube.com/channel/UCxZQ-w684G_71KcJ-8Hjhlw",
                      icon: <FaWhatsapp />,
                    },
                    {
                      href: "https://bd.linkedin.com/company/mynagad",
                      icon: <FiPhoneCall />,
                    },
                  ].map(({ href, icon }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-500 rounded-full p-2 hover:bg-blue-600 transition-colors flex items-center justify-center"
                      onClick={closeDrawer}
                    >
                      <span className="text-white">{icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
    </>
  );
};

export default Header;

