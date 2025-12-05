import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 백엔드 기본 URL 설정
// 실제 환경에서는 환경 변수를 사용해야 합니다.
// 로컬 개발 시 Spring Boot가 8080 포트에서 실행 중이라고 가정합니다.
const API_BASE_URL = 'http://localhost:8080';

/**
 * 프로젝트의 최상위 컴포넌트
 * Redux Provider, Router 설정 및 초기 통신 테스트를 담당합니다.
 */
const App = () => {
  const [testResult, setTestResult] = useState('통신 테스트 대기 중...');

  // CORS 및 API 기본 통신 테스트를 위한 useEffect
  useEffect(() => {
    // 백엔드 서버의 /api/hello 엔드포인트에 GET 요청을 보냅니다.
    // 이 요청이 성공하면 CORS 설정 및 기본 통신 환경이 구축된 것입니다.
    axios.get(`${API_BASE_URL}/api/hello`)
    .then(response => {
      const message = `✅ 통신 성공: 백엔드에서 응답을 받았습니다. 응답 메시지: "${response.data}"`;
      setTestResult(message);
      console.log('✅ [API TEST SUCCESS]', response.data);
    })
    .catch(error => {
      // 4xx 또는 5xx 오류, 혹은 네트워크 오류(CORS 실패 포함)가 발생했을 때
      let errorMessage;
      if (error.response) {
        // 서버가 응답했지만 오류 상태 코드(예: 404, 500)인 경우
        errorMessage = `❌ 통신 실패 (서버 응답 오류): 상태 코드 ${error.response.status}. 백엔드 /api/hello 엔드포인트를 확인하세요.`;
      } else if (error.request) {
        // 요청은 전송되었으나 응답을 받지 못한 경우 (가장 흔한 CORS 또는 서버 꺼짐 오류)
        errorMessage = `❌ 통신 실패 (네트워크/CORS 오류): 백엔드 서버(${API_BASE_URL})가 켜져 있는지, CORS 설정이 완료되었는지 확인하세요.`;
      } else {
        // 요청 설정 중 오류가 발생한 경우
        errorMessage = `❌ 통신 실패 (요청 설정 오류): ${error.message}`;
      }
      setTestResult(errorMessage);
      console.error('❌ [API TEST FAILURE]', errorMessage, error);
    });
  }, []);

  // Tailwind CSS를 사용한 간단한 UI
  return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg text-center">
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-4">
            📚 도서 관리 시스템 (통신 테스트)
          </h1>
          <p className="text-gray-600 mb-6">
            백엔드 서버 ({API_BASE_URL})와의 통신 상태를 확인합니다.
          </p>

          <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-200 text-left">
            <p className="font-semibold text-indigo-800 mb-2">API 테스트 결과:</p>
            <pre className={`whitespace-pre-wrap text-sm ${testResult.startsWith('✅') ? 'text-green-700 font-medium' : 'text-red-600 font-bold'}`}>
                        {testResult}
                    </pre>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            개발자 콘솔(F12)을 열어 정확한 오류 메시지를 확인하세요.
          </p>
        </div>
      </div>
  );
};

export default App;