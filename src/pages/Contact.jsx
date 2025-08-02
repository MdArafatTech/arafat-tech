import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import QRCode from "qrcode";

const IdentityForm = () => {
  const [form, setForm] = useState({
    name: "",
    father: "",
    mother: "",
    dob: "",
    age: "",
    nationality: "",
    religion: "",
    marital: "",
    village: "",
    district: "",
    thana: "",
    division: "",
    ssc: "",
    hsc: "",
    university: "",
    blood: "",
    hobby: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(false);
  const [qrDataURL, setQrDataURL] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  useEffect(() => {
    QRCode.toDataURL(JSON.stringify(form)).then(setQrDataURL);
  }, [form]);

  const generatePDF = async () => {
    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    let y = margin;

    // Background color fill
    doc.setFillColor(255, 249, 195);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // QR Code top-left
    const qrSize = 80;
    if (qrDataURL) {
      doc.addImage(qrDataURL, "PNG", margin, margin, qrSize, qrSize);
    }

    // Title center
    doc.setFontSize(22);
    doc.setTextColor("#92400e");
    doc.setFont(undefined, "bold");
    doc.text("Identity Form", pageWidth / 2, margin + 10, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor("#444");
    doc.setFont(undefined, "normal");
    doc.text("ARAFAT-TECH LTD", pageWidth / 2, margin + 32, { align: "center" });

    y = margin + 60;

    // Horizontal line below title
    doc.setDrawColor(150);
    doc.setLineWidth(1);
    doc.line(margin, y, pageWidth - margin, y);
    y += 25;

    // Section header helper
    const sectionHeader = (title) => {
      y += 20;
      doc.setFontSize(16);
      doc.setTextColor("#ea580c");
      doc.setFont(undefined, "bold");
      doc.text(title, margin, y);
      y += 8;
      doc.setDrawColor(220);
      doc.setLineWidth(0.7);
      doc.line(margin, y, pageWidth - margin, y);
      y += 12;
    };

    // Draw a label-value row box with auto-height
    const drawRow = (label, value) => {
      const labelWidth = 90;
      const rowWidth = pageWidth - margin * 2;
      const maxValueWidth = rowWidth - labelWidth - 10;
      const fontSize = 11;
      doc.setFontSize(fontSize);

      const lines = doc.splitTextToSize(value || "-", maxValueWidth);
      const rowHeight = Math.max(lines.length * 16, 20);

      doc.setDrawColor(180);
      doc.rect(margin, y, rowWidth, rowHeight);

      doc.setFont(undefined, "bold");
      doc.setTextColor("#444");
      doc.text(label + ":", margin + 8, y + 14);

      doc.setFont(undefined, "normal");
      doc.setTextColor("#000");
      doc.text(lines, margin + labelWidth + 10, y + 14);

      y += rowHeight + 6;
    };

    // Personal Information
    sectionHeader("Personal Information");
    [
      ["Full Name", form.name],
      ["Father's Name", form.father],
      ["Mother's Name", form.mother],
      ["Date of Birth", form.dob],
      ["Age", form.age],
      ["Nationality", form.nationality],
      ["Religion", form.religion],
      ["Marital Status", form.marital],
      ["Blood Group", form.blood],
      ["Hobby", form.hobby],
    ].forEach(([label, val]) => drawRow(label, val));

    // Address Information
    sectionHeader("Address Information");
    [
      ["Village", form.village],
      ["Thana", form.thana],
      ["District", form.district],
      ["Division", form.division],
    ].forEach(([label, val]) => drawRow(label, val));

    // Education Background
    sectionHeader("Education Background");
    [
      ["SSC Result", form.ssc],
      ["HSC Result", form.hsc],
      ["University", form.university],
    ].forEach(([label, val]) => drawRow(label, val));

    // Image with border top-right
    const imageWidth = 100;
    const imageHeight = 120;
    const imageX = pageWidth - margin - imageWidth;
    const imageY = margin;

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // Draw border around image
        doc.setDrawColor(100);
        doc.setLineWidth(1);
        doc.rect(imageX - 5, imageY - 5, imageWidth + 10, imageHeight + 10);

        // Add image
        doc.addImage(e.target.result, "JPEG", imageX, imageY, imageWidth, imageHeight);

        // Footer signature
        doc.setFontSize(10);
        doc.setTextColor("#666");
        doc.setFont(undefined, "italic");
        doc.text(
          "Powered by Arafat-Tech",
          pageWidth / 2,
          pageHeight - margin / 2,
          { align: "center" }
        );

        doc.save("identity_form.pdf");
      };
      reader.readAsDataURL(imageFile);
    } else {
      doc.setFontSize(10);
      doc.setTextColor("#666");
      doc.setFont(undefined, "italic");
      doc.text(
        "Powered by Arafat-Tech",
        pageWidth / 2,
        pageHeight - margin / 2,
        { align: "center" }
      );

      doc.save("identity_form.pdf");
    }
  };

  const inputStyle =
    "p-3 border rounded-lg transition duration-200 hover:border-orange-400";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-yellow-50 text-black">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mt-25 max-w-2xl shadow-xl rounded-xl p-8 border bg-white"
      >
        <div className="flex justify-center items-center mb-6 relative">
          <h2 className="text-xl font-bold text-orange-600 text-center w-full">
            Identity Form – Arafat-Tech Ltd
          </h2>
        </div>

        {!preview ? (
          <>
            <h3 className="font-semibold mb-2 text-lg">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                ["name", "Full Name"],
                ["father", "Father's Name"],
                ["mother", "Mother's Name"],
                ["dob", "Date of Birth", "date"],
                ["age", "Age"],
                ["nationality", "Nationality"],
                ["religion", "Religion"],
                ["marital", "Marital Status"],
                ["blood", "Blood Group"],
                ["hobby", "Hobby"],
              ].map(([name, label, type = "text"]) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  placeholder={label}
                  value={form[name]}
                  onChange={handleChange}
                  className={inputStyle}
                  aria-label={label}
                />
              ))}
            </div>

            <h3 className="font-semibold mb-2 text-lg">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                ["village", "Village"],
                ["thana", "Thana"],
                ["district", "District"],
                ["division", "Division"],
              ].map(([name, label]) => (
                <input
                  key={name}
                  type="text"
                  name={name}
                  placeholder={label}
                  value={form[name]}
                  onChange={handleChange}
                  className={inputStyle}
                  aria-label={label}
                />
              ))}
            </div>

            <h3 className="font-semibold mb-2 text-lg">Education Background</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                ["ssc", "SSC Result"],
                ["hsc", "HSC Result"],
                ["university", "University"],
              ].map(([name, label]) => (
                <input
                  key={name}
                  type="text"
                  name={name}
                  placeholder={label}
                  value={form[name]}
                  onChange={handleChange}
                  className={inputStyle}
                  aria-label={label}
                />
              ))}
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="p-2 border rounded-lg"
                aria-label="Upload photo"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setPreview(true)}
              className="mt-6 w-full bg-orange-500 text-white p-3 rounded-xl font-semibold hover:bg-orange-600"
              aria-label="Create form preview"
            >
              Create Form
            </motion.button>
          </>
        ) : (
          <section aria-live="polite" aria-label="Form preview">
            <h3 className="font-semibold mb-2 text-lg">Form Preview</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {Object.entries(form).map(([key, val]) => (
                <div key={key} className="border-b py-1">
                  <strong className="capitalize">{key.replace("_", " ")}:</strong>{" "}
                  {val || "-"}
                </div>
              ))}
            </div>
            {imageFile && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Uploaded Preview"
                  className="w-32 h-32 object-cover border rounded"
                />
              </div>
            )}
            <div className="mt-6 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={generatePDF}
                className="w-full bg-green-600 text-white p-3 rounded-xl font-semibold hover:bg-green-700"
                aria-label="Download PDF"
              >
                Download PDF
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setPreview(false)}
                className="w-full bg-gray-500 text-white p-3 rounded-xl font-semibold hover:bg-gray-600"
                aria-label="Edit form"
              >
                Edit Form
              </motion.button>
            </div>
          </section>
        )}
      </motion.div>
    </div>
  );
};

export default IdentityForm;
