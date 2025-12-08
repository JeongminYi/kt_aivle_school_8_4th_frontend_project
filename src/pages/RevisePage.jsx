import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { BookOutlined, Refresh as RefreshIcon } from "@mui/icons-material";
const customColors = {
    primaryPurple: "#6D28D9",
    secondaryPurple: "#5B21B6",
    infoIndigo: "#4F46E5",
    bannerBlue: "#0b5f82",
    backgroundLight: "#F9FAFB"
};
export default function RevisePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const formatDate = (dateString) => {
        if (!dateString) return "정보 없음";
        // "2025-12-05T17:03:53.750913" → "2025-12-05 17:03:53"
        return dateString.split('.')[0].replace('T', ' ');
    };
    // location.state로 전달받은 데이터 또는 기본값
    const bookData = location.state?.book;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [ImageURL, setImageURL] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                // location.state에 데이터가 있으면 그것을 사용
                if (bookData) {
                    setTitle(bookData.title || "");
                    setContent(bookData.content || "");
                    setImageURL(bookData.image || "");
                    setCreatedAt(bookData.createdAt || "");
                    setUpdatedAt(bookData.updatedAt || "");
                    setLoading(false);
                }
                // 없으면 API에서 다시 가져오기
                else if (id) {
                    const response = await axios.get(`http://localhost:8080/api/books/${id}`);
                    const data = response.data;
                    setTitle(data.title || "");
                    setContent(data.content || "");
                    setImageURL(data.coverImageUrl || "");
                    setCreatedAt(data.createdAt || "");
                    setUpdatedAt(data.updatedAt || "");
                    setLoading(false);
                }
            } catch (error) {
                console.error("도서 정보를 불러오는데 실패했습니다:", error);
                alert("도서 정보를 불러올 수 없습니다.");
                navigate('/');
            }
        };

        fetchBookData();
    }, [id, bookData, navigate]);

    const handleCancel = () => {
        navigate('/');
    };
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        setImageURL(previewUrl);

        // 추후 서버로 보낼 원본 파일 저장

    };
    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:8080/api/books/${id}`, {
                title:title,
                content:content,
                coverImageUrl:ImageURL
            });
            alert("수정이 완료되었습니다.");
            navigate(`/detail/${id}`);
        } catch (error) {
            console.error("수정 실패:", error);
            alert("수정에 실패했습니다.");
        }
    };

    if (loading) {
        return <div className="register-container">로딩중...</div>;
    }

    return (
        <Container
            maxWidth={false}
            sx={{
                width: "1500px",
                mx: "auto",
                py: { xs: 3, md: 5 }
            }}
        >
            {/* Banner */}
            <Paper
                elevation={4}
                sx={{
                    bgcolor: customColors.bannerBlue,
                    color: "common.white",
                    px: 4,
                    py: 1.2,
                    borderRadius: 1,
                    mb: 3
                }}
            >
                <Stack spacing={0.2}>
                    <Typography variant="h5" component="h2">
                        도서 정보 수정
                    </Typography>
                </Stack>
            </Paper>
            <Paper
                elevation={4}
                sx={{
                    border: `2px solid ${customColors.bannerBlue}`,
                    p: { xs: 3, md: 5 }
                }}
            >
            <Grid container spacing={10} alignItems="start">
                {/* Left: Image preview */}
                <Grid item xs={12} md={3}>
                    <Box
                        sx={{
                            width: "100%",
                            aspectRatio: { xs: "2 / 3", md: "3 / 4" },
                            minHeight: 250,
                            bgcolor: ImageURL ? "transparent" : customColors.bannerBlue,
                            color: ImageURL ? "inherit" : "white",
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            position: "relative",
                            justifyContent: "center",
                            overflow: "hidden",
                            p: 2,
                            boxShadow: 5
                        }}
                    >
                        {ImageURL ? (
                            <Box
                                component="img"
                                src={ImageURL}
                                alt="cover preview"
                                sx={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: 1
                                }}
                            />
                        ) : (
                            <Typography variant="h6">작품이미지</Typography>
                        )}

                    </Box>
                    <Button
                        variant="contained"
                        component="label"

                        sx={{
                            mt: 3,
                            bgcolor: "#064f6a",
                            position: "medium",
                            "&:hover": { bgcolor: "#053f53" },
                            fontSize: 13,
                            textTransform: "none"
                        }}
                        size="small"
                    >
                        이미지 업로드
                        <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                    </Button>
                    <Button
                        variant="contained"
                        onClick = {() =>  navigate(`/detail/${id}/updateCover`,{state:{id: id ,title:title, content:content,image:ImageURL}})}
                        sx={{
                            marginLeft:4,
                            mt: 3,
                            bgcolor: "#064f6a",
                            position: "medium",
                            "&:hover": { bgcolor: "#053f53" },
                            fontSize: 13,
                            textTransform: "none"
                        }}
                        size="small"
                    >
                        AI 이미지 생성

                    </Button>
                </Grid>

                {/* Right: Inputs */}
                <Grid item xs={12} md={9} sx={{width:'75%'}}>
                    <Stack spacing={2}>
                        <Box sx={{ width: "100%" }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                                도서 제목
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="도서 제목을 입력하세요"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                size="medium"
                                sx={{ mb: 3 }}
                            />

                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                                도서 설명
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={7}
                                placeholder="도서 설명을 입력하세요"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Box>

                        {/* Buttons aligned to right */}
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 1 }}>
                            <lable>{'수정날짜: '+formatDate(updatedAt)+"  /  "+'생성날짜: '+formatDate(createdAt)}</lable>
                            <Button
                                variant="outlined"
                                onClick={handleCancel}
                                sx={{
                                    bgcolor: "#f5f5f5",
                                    borderColor: "#d0d0d0",
                                    color: "#333",
                                    textTransform: "none"
                                }}
                            >
                                취소
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                startIcon= {<RefreshIcon />}
                                sx={{
                                    bgcolor: customColors.bannerBlue,
                                    "&:hover": { bgcolor: "#064f6a" },
                                    color: "white",
                                    textTransform: "none"
                                }}
                            >
                                    {"등록"}
                            </Button>
                        </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
);
}

