// components/WalletGuideDialog.jsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import imageGuide from "../../assets/QnA-Image/1.png"
import imageGuide2 from "../../assets/QnA-Image/2.png"
import imageGuide3 from "../../assets/QnA-Image/3.png"
import imageGuide4 from "../../assets/QnA-Image/4.png"
import imageGuide5 from "../../assets/QnA-Image/5.png"
import imageGuide6 from "../../assets/QnA-Image/6.png"
import imageGuide7 from "../../assets/QnA-Image/7.png"
import imageGuide8 from "../../assets/QnA-Image/8.png"



export default function WalletGuideDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:max-w-[400px] w-full max-w-[400px] max-h-[90vh] overflow-y-auto bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">지갑 설정 가이드</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* STEP 1 */}
          <GuideStep
            number={1}
            title="팬텀 지갑 접속"
            description="팬텀 지갑 앱을 실행합니다"
            image= {imageGuide}
            alt="imageGuide1"
            
          />

          {/* STEP 2 */}
          <GuideStep
            number={2}
            title="표시된 [⋯] 클릭"
            description="코인 목록 우측 상단의 [⋯] 아이콘을 클릭합니다"
            image={imageGuide2}
            alt="imageGuide2"
          />

          {/* STEP 3 */}
          <GuideStep
            number={3}
            title="[토큰 관리] 클릭"
            description="토큰 관리 메뉴를 선택합니다"
            image={imageGuide3}
            alt="imageGuide3"
          />

          {/* STEP 4 */}
          <GuideStep
            number={4}
            title="[입금 받은 코인의 스위치] 클릭"
            description="입금 받은 코인의 우측 슬라이더를 [ON]으로 변경합니다"
            image={imageGuide4}
            alt="imageGuide4"
          />

          {/* STEP 5 */}
          <GuideStep
            number={5}
            title="메인 화면으로 돌아가기"
            description="팬텀 지갑 메인 화면으로 돌아갑니다"
            image={imageGuide5}
            alt="imageGuide5"
          />

          {/* STEP 6 */}
          <GuideStep
            number={6}
            title="[입금 받은 코인] 클릭"
            description="입금받은 코인을 선택합니다"
            image={imageGuide6}
            alt="imageGuide6"
          />

          {/* STEP 7 */}
          <GuideStep
            number={7}
            title="[스팸 아님으로 신고] 클릭"
            description='하단의 "스팸 아님으로 신고" 버튼을 클릭합니다'
            image={imageGuide7}
            alt="ImageGuide7"
          />

          <GuideStep
            number={8}
            title="[스팸 아님으로 신고] 클릭"
            description='하단의 "스팸 아님으로 신고" 버튼을 클릭합니다'
            image={imageGuide8}
            alt="imageGuide8"
          />

          {/* FINAL STEP */}
          <div className="bg-green-900/30 border-2 border-green-600/50 rounded-lg p-6">
            <p className="text-green-400 font-bold text-center text-lg">✓ 코인이 정상적으로 표시됩니다</p>
            <p className="text-green-300 text-center text-sm mt-2">
              이제 팬텀 지갑에서 입금받은 코인을 정상적으로 확인할 수 있습니다
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function GuideStep({ number, title, description, image, alt }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
          {number}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-sm text-gray-300 ml-13 mb-3">{description}</p>
      <div className="ml-3 bg-gray-700/50 rounded-lg p-3 flex items-center justify-center min-h-[200px]">
        <img src={image} alt={alt} className="rounded-lg max-w-full h-[400px]" />
      </div>
    </div>
  )
}
