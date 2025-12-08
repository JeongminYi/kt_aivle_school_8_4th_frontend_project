import React, {useState} from 'react';
import {
  Alert,
  alpha,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import {
  BookOutlined,
  PaletteOutlined,
  Refresh as RefreshIcon
} from '@mui/icons-material';
// MUI에서 사용할 커스텀 스타일 및 색상 정의
const customColors = {
  primaryPurple: '#6D28D9', // 메인 액션 색상 (보라)
  secondaryPurple: '#5B21B6',
  infoIndigo: '#4F46E5', // 아이콘 및 강조 색상 (인디고)
  backgroundLight: '#F9FAFB', // 아주 연한 배경
};

// DALL-E 모델 옵션
const dalleOptions = [
  {value: 'dall-e-3', label: 'DALL-E 3 (최신)'},
  {value: 'dall-e-2', label: 'DALL-E 2'},
  {value: 'imagen-4.0', label: 'Imagen 4.0 (Recommended)'},
];

/**
 * 재사용 가능한 MUI 기반 Select input component
 */
const SelectInput = ({options, label, value, onChange}) => {
  return (
      <FormControl fullWidth size="small" sx={{minWidth: 150}}>
        <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
        <Select
            labelId={`select-label-${label}`}
            id={`select-${label}`}
            value={value}
            label={label}
            onChange={onChange}
            sx={{
              borderRadius: '8px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(customColors.primaryPurple, 0.5)
              }
            }}
        >
          {options.map((option) => (
              <MenuItem
                  key={option.value}
                  value={option.value}
              >
                {option.label}
              </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
};

/**
 * AI 표지 생성 페이지 컴포넌트 (순수 MUI)
 */
const NewBookCoverPage = () => {

  // --- 1. 목업 데이터 ---
  const bookData = {
    bookId: 456,
    createdAt: '2023-10-01 14:30',
    updatedAt: '2024-05-20 09:15',
    title: '책 제목입니다. 이 제목을 기반으로 표지를 만들 수 있습니다.',
    content: '이 책의 주요 내용은 인공지능이 인간의 창작 활동에 미치는 영향과 미래의 협업 방식에 대한 심층적인 분석입니다. 배경은 푸른색 계열로 해주세요.',
  };

  // 현재 표지 이미지 목업 URL (갤러리 표시용)
  const MOCK_COVER_URL = 'https://placehold.co/300x450/4F46E5/F9FAFB?text=Current+Book+Cover';

  // --- 2. 사용자 입력 상태 ---
  const [apiKey, setApiKey] = useState('');
  const [selectedDalleVersion, setSelectedDalleVersion] = useState(
      dalleOptions[0].value);
  const [prompt, setPrompt] = useState(bookData.content);

  // --- 3. UI 상태 ---
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageSeverity, setMessageSeverity] = useState('info');

  /**
   * 표지 생성 버튼 핸들러
   */
  const handleRegenerateCover = () => {
    setMessage(null);

    if (!apiKey.trim() || !prompt.trim()) {
      setMessageSeverity('warning');
      setMessage("API 키와 생성 프롬프트를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setMessageSeverity('info');
    setMessage(`[${selectedDalleVersion}] 모델로 표지 생성 요청 중...`);

    console.log(`[A 담당 영역] API 호출: 도서 ID ${bookData.bookId}에 대해 표지 재생성 요청`);

    // 예시: 3초 후 완료 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      setMessageSeverity('success');
      setMessage("🎉 AI 표지 생성이 성공적으로 완료되었습니다. 잠시 후 상세 페이지로 이동합니다.");
    }, 3000);
  };

  return (
      <Container maxWidth="lg" sx={{mt: {xs: 3, lg: 6}, mb: 6}}>
        <Paper
            elevation={5}
            sx={{
              p: {xs: 4, sm: 6, md: 8},
              borderRadius: '16px',
              boxShadow: 8
            }} // 그림자 강화
        >
          {/* 메시지 출력 영역 */}
          {message && (
              <Alert
                  severity={messageSeverity}
                  sx={{
                    mb: 4,
                    borderRadius: '8px',
                    // 메시지 색상에 맞게 왼쪽 보더 스타일링
                    borderLeft: `4px solid ${messageSeverity === 'info'
                        ? customColors.infoIndigo : messageSeverity
                        === 'warning' ? '#ff9800' : messageSeverity
                        === 'success' ? '#4CAF50' : '#F44336'}`,
                    backgroundColor: alpha(customColors.backgroundLight, 0.8), // 부드러운 배경
                  }}
              >
                {message}
              </Alert>
          )}

          <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                color: 'text.primary',
                fontWeight: 'extrabold',
                borderBottom: `2px solid ${alpha(customColors.primaryPurple,
                    0.1)}`, // 구분선 색상 변경
                pb: 2,
                mb: 5
              }}
          >
            🎨 AI 도서 표지 생성 및 수정
          </Typography>

          {/* 메인 레이아웃: Grid 분할 (columns={12} 제거, item 속성 복원) */}
          <Grid container spacing={{xs: 4, sm: 6, lg: 8}}>

            {/* --- 좌측 컬럼: 도서 정보 미리보기 (sm=5/12 ≈ 41.6%) --- */}
            {/* item 속성 복원 및 xs/sm 속성 사용 */}
            <Grid item xs={12} sm={5}>
              <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    color: customColors.infoIndigo,
                    mb: 3,
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center'
                  }}
              >
                <BookOutlined sx={{mr: 1}}/> 도서 정보 미리보기
              </Typography>

              <Paper
                  elevation={6} // 미리보기 영역 그림자 강화
                  sx={{
                    p: 3,
                    borderRadius: '12px',
                    bgcolor: 'white', // 배경을 흰색으로 고정
                    border: `1px solid ${alpha(customColors.infoIndigo, 0.1)}`, // 연한 보더 추가
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'box-shadow 0.3s',
                    '&:hover': {
                      boxShadow: 10,
                    }
                  }}
              >

                {/* 현재 표지 이미지 (Placeholder) */}
                <Box
                    sx={{
                      width: '100%',
                      maxWidth: '220px', // 최대 너비 약간 확대
                      aspectRatio: '2 / 3',
                      mb: 3,
                      boxShadow: 8,
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: `3px solid ${customColors.primaryPurple}` // 표지에 강조 보더 적용
                    }}
                >
                  <img
                      src={MOCK_COVER_URL}
                      alt="Current Book Cover"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/300x450/cccccc/000000?text=Image+Error"
                      }}
                  />
                </Box>

                {/* 제목 */}
                <Typography
                    variant="h5" // 제목 크기 강조
                    component="h3"
                    sx={{
                      fontWeight: 'extrabold',
                      textAlign: 'center',
                      color: 'text.primary',
                      mb: 1,
                      px: 1,
                      fontSize: {xs: '1.1rem', sm: '1.25rem'}
                    }}
                >
                  {bookData.title}
                </Typography>

                {/* 내용 (요약) */}
                <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      textAlign: 'center',
                      mb: 3,
                      fontStyle: 'italic',
                      px: 1,
                      // 텍스트 잘림을 위한 -webkit-box 스타일 유지
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 3
                    }}
                >
                  {bookData.content}
                </Typography>

                {/* 생성일 및 수정일 */}
                <Box
                    sx={{
                      fontSize: '0.75rem',
                      color: 'text.secondary',
                      width: '100%',
                      borderTop: `1px solid ${alpha('#E5E7EB', 0.8)}`,
                      pt: 2,
                      mt: 'auto'
                    }}
                >
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 0.5
                  }}>
                    <Typography component="strong" sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                      fontSize: 'inherit'
                    }}>생성일:</Typography>
                    <Typography component="span" sx={{
                      fontFamily: 'monospace',
                      fontSize: 'inherit'
                    }}>{bookData.createdAt}</Typography>
                  </Box>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography component="strong" sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                      fontSize: 'inherit'
                    }}>수정일:</Typography>
                    <Typography component="span" sx={{
                      fontFamily: 'monospace',
                      fontSize: 'inherit'
                    }}>{bookData.updatedAt}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* --- 우측 컬럼: AI 생성 설정 및 프롬프트 (sm=7/12 ≈ 58.3%) --- */}
            {/* item 속성 복원 및 xs/sm 속성 사용 */}
            <Grid item xs={12} sm={7}>

              {/* --- 2. AI 설정 --- */}
              <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    color: customColors.primaryPurple,
                    mb: 3,
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center'
                  }}
              >
                <PaletteOutlined sx={{mr: 1}}/> AI 생성 설정
              </Typography>

              <Paper
                  elevation={1} // 그림자 낮춤
                  sx={{
                    p: 3,
                    borderRadius: '12px',
                    bgcolor: alpha(customColors.primaryPurple, 0.05),
                    mb: 4,
                    border: `1px solid ${alpha(customColors.primaryPurple,
                        0.1)}`
                  }}
              >
                <Grid container spacing={2}
                      alignItems="flex-end"> {/* columns={12} 제거 */}
                  {/* API Key 입력 (Password) */}
                  <Grid item xs={12} sm={6}> {/* item, xs, sm 속성 복원 */}
                    <TextField
                        fullWidth
                        label="API Key (보안 입력)"
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk-..."
                        variant="outlined"
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            bgcolor: 'white',
                          }
                        }}
                    />
                  </Grid>

                  {/* DALL-E 버전 선택 */}
                  <Grid item xs={12} sm={6}> {/* item, xs, sm 속성 복원 */}
                    <SelectInput
                        options={dalleOptions}
                        label="AI 모델 선택"
                        value={selectedDalleVersion}
                        onChange={(e) => setSelectedDalleVersion(
                            e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Paper>


              {/* --- 3. 프롬프트 입력 및 버튼 --- */}
              <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    color: customColors.primaryPurple,
                    mb: 3,
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center'
                  }}
              >
                ✨ 표지 생성 프롬프트
              </Typography>

              <TextField
                  fullWidth
                  label="AI 표지 생성 프롬프트"
                  multiline
                  rows={7}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="도서의 주제나 원하는 스타일을 상세하게 묘사해주세요. 예: '신비로운 숲 속에 홀로 서 있는 검은색 고양이, 미니멀리즘 디지털 아트 스타일'"
                  variant="outlined"
                  sx={{
                    mb: 4,
                    '& .MuiOutlinedInput-root': {borderRadius: '12px'}
                  }}
              />

              <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={isLoading ? <CircularProgress size={20}
                                                           color="inherit"/> :
                      <RefreshIcon/>}
                  onClick={handleRegenerateCover}
                  disabled={isLoading || !apiKey.trim() || !prompt.trim()}
                  sx={{
                    py: 1.5,
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    bgcolor: customColors.primaryPurple,
                    // 호버 및 비활성화 상태 스타일링 개선
                    '&:hover': {
                      bgcolor: customColors.secondaryPurple,
                      boxShadow: 3,
                    },
                    '&.Mui-disabled': {
                      bgcolor: alpha(customColors.primaryPurple, 0.3),
                      color: alpha('#ffffff', 0.7),
                    }
                  }}
              >
                {isLoading ? '표지 생성 요청 중...' : '새로운 표지 생성 요청'}
              </Button>

              <Typography
                  variant="caption"
                  display="block"
                  align="center"
                  sx={{mt: 3, color: 'text.secondary'}}
              >
                * 이 작업은 선택하신 모델을 기반으로 새로운 표지 이미지를 생성하며, 실제 API 호출 비용이 발생할 수
                있습니다.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
  );
};

export default NewBookCoverPage;