import React, { useState } from 'react';
import Modal from 'react-modal';
import '../css/components/TermsAgreementModal.css';

Modal.setAppElement('#root');

const TermsAgreementModal = ({ isOpen, onRequestClose, handleSubmit, registerCheck, setRegisterCheck }) => {
    const [isAgreementOpen, setIsAgreementOpen] = useState(false); // 개인정보 수집 안내 모달 상태

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setRegisterCheck(prevState => ({ ...prevState, [id]: checked }));
    };

    const handleSubmitClick = () => {
        if (!registerCheck.terms1 || !registerCheck.terms2 || !registerCheck.terms3) {
            alert('필수 항목을 모두 선택해주세요.');
            return;
        }
        onRequestClose(); // 모달을 닫습니다
        handleSubmit(); // 전달받은 handleSubmit 함수를 호출합니다
    };

    const handleOpenAgreement = () => {
        setIsAgreementOpen(true); // 약관 모달 열기
    };

    const handleCloseAgreement = () => {
        setIsAgreementOpen(false); // 약관 모달 닫기
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Terms Agreement Modal"
                className="Modal"
                overlayClassName="Overlay"
            >
                <div className="modal-content">
                    <div className="agreement-section">
                        <h3 className='agreement_title'>약관에 동의해주세요</h3>
                        <p className='agreement_sub'>여러분의 소중한 개인정보를 잘 지켜 드릴게요</p>
                        <ul className="agreement_desc">
                            <li>
                                <input type="checkbox" id="terms1" checked={registerCheck.terms1} onChange={handleCheckboxChange} />
                                <label htmlFor="terms1">이용약관 동의 </label>
                                <img className='agreement_right' src="/assets/Term.svg" alt="" onClick={handleOpenAgreement} /> {/* 이미지 클릭 이벤트 */}
                            </li>
                            <li>
                                <input type="checkbox" id="terms2" checked={registerCheck.terms2} onChange={handleCheckboxChange} />
                                <label htmlFor="terms2">개인정보 수집 이용 동의 </label>
                                
                            </li>
                            <li>
                                <input type="checkbox" id="terms3" checked={registerCheck.terms3} onChange={handleCheckboxChange} />
                                <label htmlFor="terms3">만 14세 이상입니다 </label>
                            </li>
                        </ul>
                    </div>
                    <button className="agree-button" onClick={handleSubmitClick}>
                        모두 동의하고 가입하기
                    </button>
                </div>
            </Modal>

            {/* 개인정보 수집 안내 모달 */}
            <Modal
                isOpen={isAgreementOpen}
                onRequestClose={handleCloseAgreement}
                contentLabel="Personal Information Collection"
                className="Modal_TERM"
                overlayClassName="Overlay_TERM"
            >
                <div className="agreement-box_TERM">
                    <p style={{ textAlign: "left" }}>
                        개인정보 수집 안내
                        <br />
                        <br /> 1. 개인정보 수집 목적
                        <br />
                        - 가톨릭대학교 중앙동아리 COMA는 다음 목적을 위해 개인정보를 수집합니다:
                        <br />
                        &nbsp; - 가톨릭대학교 총학생회 주관 아우름제 COMA 노점 이벤트인 COMAtching의 참여
                        <br />
                        <br />
                        2. 수집하는 개인정보 항목 * 수집하는 개인정보 항목은 다음과 같습니다:{" "}
                        <br />
                        &nbsp;* 인적사항 <br />
                        &nbsp; &nbsp;* 성명, 학번, 연락처 <br />
                        <br />
                        3. 개인정보 제 3자 제공 <br />
                        &nbsp;* 수집한 개인정보는 다음 3자에게 정보가 제공됩니다: <br />
                        &nbsp; &nbsp;* COMAtching 참여자 <br />
                        4. 개인정보 보유 및 이용기간 <br />
                        <br />
                        &nbsp;2024년 5월 24일 23시 59분까지
                        <br />
                        <br /> * 개인정보는 수집 및 이용목적이 달성되면 지체 없이 파기됩니다. 다만, 관련 법규에 따라 보존할 필요가 있는 경우에는 해당 기간 동안
                        안전하게 보관됩니다. <br />
                        <br /> 5. 개인정보 수집 거부권 * 개인정보의 수집은 자발적으로 제공하실 수 있으며, 수집에 동의하지 않을 권리가 있습니다. 다만, 일부 정보를
                        제공하지 않을 경우 가톨릭대 중앙동아리 COMA의 일부 서비스를 이용할 수 없을 수 있습니다. <br />
                        <br /> 6. 개인정보 관련 문의 및 민원처리 <br />* 개인정보 수집과 관련한 문의사항이나 민원은 다음으로 문의해 주시기 바랍니다: <br />
                        &nbsp;* 최고 정보 관리 책임자 : 가톨릭대학교 중앙동아리 COMA
                        <br /> &nbsp;* 개인정보보호책임자 : 가톨릭대학교 정보통신전자공학부 19학번 박승원 <br />
                        &nbsp;* 개인정보 수집 및 이용 주체 : 가톨릭대학교 중앙 IT동아리 COMA{" "}
                        <br />
                        <br />
                        7. 개인정보 수집 및 이용 동의 * 본인은 개인정보 수집 및 이용에 대해 동의합니다.
                    </p>
                    <div className="cancel-button_TERM" onClick={handleCloseAgreement}>
                        닫기
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default TermsAgreementModal;
