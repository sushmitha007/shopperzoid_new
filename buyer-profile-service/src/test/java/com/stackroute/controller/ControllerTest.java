//package com.stackroute.controller;
//
//
//
//
//
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.stackroute.domain.Buyer;
//import com.stackroute.repository.BuyerRepository;
//import com.stackroute.service.BuyerService;
//import org.junit.After;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.MockitoAnnotations;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.anyInt;
//import static org.mockito.Mockito.when;
//
//    @RunWith(SpringRunner.class)
//    @WebMvcTest
//    public class ControllerTest {
//
//        @Autowired
//        private MockMvc mockMvc;
//        private Buyer buyer;
//
//        @MockBean
//        private BuyerRepository buyerRepository;
//
//        @MockBean
//        private BuyerService buyerService;
//
//        @InjectMocks
//        private BuyerController buyerController;
//
//        private List<Buyer> list = null;
//
//
//        @Before
//        public void setUp() throws Exception {
//            MockitoAnnotations.initMocks(this);
//            mockMvc = MockMvcBuilders.standaloneSetup(buyerController).setControllerAdvice(new GlobalExceptionHandler()).build();
//            buyer = new Buyer();
//            buyer.setBuyerName("suti");
//            buyer.setBuyerEmail("suhail@gmail.com");
//            buyer.setBuyerPhone(90909090);
//
//            list = new ArrayList<>();
//            list.add(buyer);
//        }
//
//        @After
//        public void tearDown() throws Exception {
//
//        }
//
//        @Test
//        public void saveMovie() throws Exception {
//
//            when(movieService.saveMovie(any())).thenReturn(movie);
//            mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/movie")
//                    .contentType(MediaType.APPLICATION_JSON).content(asJsonString(movie)))
//                    .andExpect(MockMvcResultMatchers.status().isCreated())
//                    .andDo(MockMvcResultHandlers.print());
//        }
//
//        @Test
//        public void saveMovieFailure() throws Exception {
//            when(movieService.saveMovie(any())).thenThrow(MovieAlreadyExistsException.class);
//            mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/movie")
//                    .contentType(MediaType.APPLICATION_JSON).content(asJsonString(movie)))
//                    .andExpect(MockMvcResultMatchers.status().isConflict())
//                    .andDo(MockMvcResultHandlers.print());
//        }
//        @Test
//        public void getAllMovies() throws Exception {
//            when(movieService.getAllMovies()).thenReturn(list);
//            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/movie")
//                    .contentType(MediaType.APPLICATION_JSON).content(asJsonString(movie)))
//                    .andExpect(MockMvcResultMatchers.status().isOk())
//                    .andDo(MockMvcResultHandlers.print());
//        }
//
//        @Test
//        public void getMovieById() throws Exception {
//            when(movieService.getMovieById(anyInt())).thenReturn(movie);
//            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/movie/{movieId}",101)
//                    .contentType(MediaType.APPLICATION_JSON).content(asJsonString(movie)))
//                    .andExpect(MockMvcResultMatchers.status().isOk())
//                    .andDo(MockMvcResultHandlers.print());
//        }
//
//        @Test
//        public void getMovieByIdFailure() throws Exception {
//            when(movieService.getMovieById(anyInt())).thenThrow(MovieNotFoundException.class);
//            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/movie/{movieId}",100)
//                    .contentType(MediaType.APPLICATION_JSON).content(asJsonString(movie)))
//                    .andExpect(MockMvcResultMatchers.status().isConflict())
//                    .andDo(MockMvcResultHandlers.print());
//        }
//
//        @Test
//        public void updateContent() throws Exception {
//            when(movieService.updateContent(any(),any())).thenReturn(movie);
//            mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/movie/{movieId}",1)
//                    .contentType(MediaType.APPLICATION_JSON).content(asJsonString(movie)))
//                    .andExpect(MockMvcResultMatchers.status().isOk())
//                    .andDo(MockMvcResultHandlers.print());
//        }
//
//        @Test
//        public void updateContentFailure() throws Exception {
//            when(movieService.updateContent(any(), any())).thenThrow(MovieNotFoundException.class);
//            mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/movie/{movieId}",0)
//                    .contentType(MediaType.APPLICATION_JSON).content(asJsonString(movie)))
//                    .andExpect(MockMvcResultMatchers.status().isConflict())
//                    .andDo(MockMvcResultHandlers.print());
//        }
//
//        @Test
//        public void getMoviesByName() throws Exception {
//            when(movieService.findMovieByMovieName(any())).thenReturn(list);
//            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/movies/{movieName}","Robin")
//                    .contentType(MediaType.APPLICATION_JSON).content(asJsonString(movie)))
//                    .andExpect(MockMvcResultMatchers.status().isOk())
//                    .andDo(MockMvcResultHandlers.print());
//        }
//
//        @Test
//        public void getMoviesByNameFailure() throws Exception {
//            when(movieService.findMovieByMovieName(any())).thenThrow(MovieNotFoundException.class);
//            mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/movies/{movieName}","Marvel")
//                    .contentType(MediaType.APPLICATION_JSON).content(asJsonString(movie)))
//                    .andExpect(MockMvcResultMatchers.status().isConflict())
//                    .andDo(MockMvcResultHandlers.print());
//        }
//
//        @Test
//        public void deleteMovie() throws Exception {
//            when(movieService.deleteMovieById(anyInt())).thenReturn(movie);
//            mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/movie/{movieId}","3")
//                    .contentType(MediaType.APPLICATION_JSON).content(asJsonString(movie)))
//                    .andExpect(MockMvcResultMatchers.status().isOk())
//                    .andDo(MockMvcResultHandlers.print());
//        }
//
//        @Test
//        public void deleteMovieFailure() throws Exception {
//            when(movieService.deleteMovieById(anyInt())).thenThrow(MovieNotFoundException.class);
//            mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/movie/{movieId}","11")
//                    .contentType(MediaType.APPLICATION_JSON).content(asJsonString(movie)))
//                    .andExpect(MockMvcResultMatchers.status().isConflict())
//                    .andDo(MockMvcResultHandlers.print());
//        }
//        private static String asJsonString(final Object obj)
//        {
//            try{
//                return new ObjectMapper().writeValueAsString(obj);
//
//            }catch(Exception e){
//                throw new RuntimeException(e);
//            }
//        }
//    }*/
//
//
//
