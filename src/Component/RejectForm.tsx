import React, { useState } from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


interface RejectFormProps {
  onSubmit: (data: any) => void;
}

const RejectForm: React.FC<RejectFormProps> = ({ onSubmit }) => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getCurrentTime = () => {
    const today = new Date();
    return today.toTimeString().split(' ')[0].substring(0, 5);
  };

  const [formData, setFormData] = useState({
    hn: '',
    ptName: '',
    ward: '',
    ln: '',
    reasons: {
      reason1: false,
      reason2: false,
      reason3: false,
      reason4: false,
      reason5: false,
      reason6: false,
      reason7: false,
      reason8: false,
      reason9: false,
      reason10: false,
      reason11: false,
      reason12: false,
      reason13: false,
      reason13_1: false,
      reason13_2: false,
      reason13_3: false,
      otherReasons: []
    },
    date: getCurrentDate(),
    time: getCurrentTime()
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
  
    // Update the formData state
    setFormData(prevData => ({
      ...prevData,
      reasons: {
        ...prevData.reasons,
        [name]: checked
      }
    }));
  
    // Disable related checkboxes if reason13 is not selected
    console.log(name);
    console.log(checked);
    if (name === 'reason13_1' || name === 'reason13_2'|| name === 'reason13_3') {
      console.log('test');
      if(!formData.reasons.reason13){
        setFormData(prevData => ({
          ...prevData,
          reasons: {
            ...prevData.reasons,
            reason13_1: false,
            reason13_2: false,
            reason13_3: false
          }
        }));
      }
    } else if(name === 'reason13' && !checked){
      setFormData(prevData => ({
        ...prevData,
        reasons: {
          ...prevData.reasons,
          reason13_1: false,
          reason13_2: false,
          reason13_3: false
        }
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    screenShotPDF();
    onSubmit(formData);
  };

  const screenShotPDF = () => {
    const input = document.getElementById('contentForCapture');
    
    // Check if input element exists
    if (input instanceof HTMLElement) {
      html2canvas(input, { logging: true, useCORS: true }).then((canvas: HTMLCanvasElement) => {
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('lab-reject.pdf');
      });
    } else {
      console.error("Element with id 'contentForCapture' not found.");
    }
  }
  
  
  

  return (
    <div>
      <div  id='contentForCapture'>
        <form className="p-4 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4 mt-6">
        <h2 className="text-xl font-bold text-center">LABORATORY REJECT SPECIMEN</h2>
        <p className="text-center">ในปฏิเสธสิ่งส่งตรวจจากห้องปฏิบัติการ</p>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block font-medium text-gray-700">HN</label>
            <input
              type="text"
              name="hn"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
              value={formData.hn}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">PT.NAME</label>
            <input
              type="text"
              name="ptName"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
              value={formData.ptName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">WARD</label>
            <input
              type="text"
              name="ward"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
              value={formData.ward}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">LN</label>
            <select
              name="ln"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
              value={formData.ln}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {/* Add options here */}
            </select>
          </div>
        </div>
        <div>
          <label className="block font-medium text-gray-700 h-16">กลุ่มงานเทคนิคการแพทย์และพยาธิวิทยาคลินิก ขอปฏิเสธการรับสิ่งส่งตรวจของผู้ป่วยรายนี้เนื่องจาก</label>
          <div  className="grid grid-cols-2 gap-4"  style={{ textAlign: 'start' }}>
            <div>
              <input
                type="checkbox"
                id="reason1"
                name="reason1"
                checked={formData.reasons.reason1}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason1" className="ml-2">สิ่งตรวจเลือดแข็งตัว (Clot) ไม่สามารถใช้ทำการทดสอบได้</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="reason2"
                name="reason2"
                checked={formData.reasons.reason2}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason2" className="ml-2">สั่งรายการตรวจแต่ไม่มีสิ่งส่งตรวจ</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="reason3"
                name="reason3"
                checked={formData.reasons.reason3}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason3" className="ml-2">มีสิ่งส่งตรวจแต่ไม่สั่งรายการตรวจในระบบ HIS</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="reason4"
                name="reason4"
                checked={formData.reasons.reason4}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason4" className="ml-2">มีสิ่งส่งตรวจ สั่งรายการตรวจ แต่ไม่มีใบนำส่ง</label>
            </div>


            <div>
              <input
                type="checkbox"
                id="reason5"
                name="reason5"
                checked={formData.reasons.reason5}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason5" className="ml-2">ไม่ระบุชื่อ-สกุล/HN ผู้ป่วย บนสิ่งส่งตรวจ</label>
            </div>

            

            <div>
              <input
                type="checkbox"
                id="reason6"
                name="reason6"
                checked={formData.reasons.reason6}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason6" className="ml-2">อุณหภูมิไม่เหมาะสม ไม่แช่เย็นนำส่ง</label>
            </div>



            <div>
              <input
                type="checkbox"
                id="reason7"
                name="reason7"
                checked={formData.reasons.reason7}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason7" className="ml-2">ขาดใบประวัติ</label>
            </div>



            <div>
              <input
                type="checkbox"
                id="reason8"
                name="reason8"
                checked={formData.reasons.reason8}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason8" className="ml-2">H/C ไม่ระบุเวลาเจาะ</label>
            </div>



            <div>
              <input
                type="checkbox"
                id="reason9"
                name="reason9"
                checked={formData.reasons.reason9}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason9" className="ml-2">ปริมาณน้อยไม่พอทดสอบ</label>
            </div>



            <div>
              <input
                type="checkbox"
                id="reason10"
                name="reason10"
                checked={formData.reasons.reason10}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason10" className="ml-2">สิ่งส่งตรวจหกเลอะเทอะ</label>
            </div>



            <div>
              <input
                type="checkbox"
                id="reason11"
                name="reason11"
                checked={formData.reasons.reason11}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason11" className="ml-2">ไม่มีลายเซนต์แพทย์ หรือ พยาบาลในใบ OUT LAB</label>
            </div>



            <div>
              <input
                type="checkbox"
                id="reason12"
                name="reason12"
                checked={formData.reasons.reason12}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason12" className="ml-2">นำส่งล่าช้าเกินเวลาที่กำหนด</label>
            </div>



            <div>
              <input
                type="checkbox"
                id="reason13"
                name="reason13"
                checked={formData.reasons.reason13}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason13" className="ml-2">ภาชนะสิ่งส่งตรวจไม่ถูกต้อง</label>
              <br></br>

              &nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="checkbox"
                id="reason13_1"
                name="reason13_1"
                checked={formData.reasons.reason13_1}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason13_1" className="ml-2">G/S ไม่ใส่ขวด Sterile</label>
              <br></br>

              &nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="checkbox"
                id="reason13_2"
                name="reason13_2"
                checked={formData.reasons.reason13_2}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason13_2" className="ml-2">C/S ไม่ใส่ขวด Sterile</label>
              <br></br>

              &nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="checkbox"
                id="reason13_3"
                name="reason13_3"
                checked={formData.reasons.reason13_3}
                onChange={handleReasonChange}
              />
              <label htmlFor="reason13_3" className="ml-2">ชนิดหลอดเลือดไม่ถูกต้อง</label>

            </div>

          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">DATE</label>
            <input
              type="date"
              name="date"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">TIME</label>
            <input
              type="time"
              name="time"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        </div>
        </form>
      </div>
      
      <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm" onClick={handleSubmit}>SAVE & PRINT</button>
      </div>

    </div>
  );
};

export default RejectForm;
