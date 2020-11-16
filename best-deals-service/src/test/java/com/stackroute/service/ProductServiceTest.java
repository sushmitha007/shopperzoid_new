package com.stackroute.service;

import com.stackroute.domain.Product;
import com.stackroute.domain.Seller;
import com.stackroute.exceptions.ProductAlreadyExistsException;
import com.stackroute.exceptions.ProductNotFoundException;
import com.stackroute.repository.ProductRepository;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import static org.mockito.Mockito.*;

public class ProductServiceTest {

    private Product product;
    private Product product1;
    private List<Product> productList =new ArrayList<>();
    private List<Product> expectedProductList=new ArrayList<>();
    private Product expectedProduct;
    private List<Seller> sellerList=new ArrayList<>();



/**
     * Create a mock for ProductRepository
     */


    @Mock
    private ProductRepository productRepository;


/**
     * Inject the mocks as dependencies into ProductServiceImplements
     */


    @InjectMocks
    ProductServiceImpl productServiceImplements;


/**
     * Run this before each test case
     */


    @Before
    public void setUp() {
        //Initialising the mock object
        MockitoAnnotations.initMocks(this);

        expectedProductList = new ArrayList<>();
        product1=new Product();
        product1.setProductId("5dd619fbe8dae20001f4f108");
        product1.setProductName("samsung galaxy a50");
        product1.setProductBrandName("samsung");
        Seller seller1=new Seller();
        seller1.setSellerId("punithseller@gmail.com");
        seller1.setProductPrice(15999.0);
        seller1.setSellerName("Punith");
        seller1.setProductStock(100);
        seller1.setProductSold(20);
        Seller seller2=new Seller();
        seller2.setSellerId("rishavseller@gmail.com");
        seller2.setProductPrice(16099.0);
        seller2.setSellerName("Rishav");
        seller2.setProductStock(100);
        seller2.setProductSold(0);
        Seller seller3=new Seller();
        seller3.setSellerId("sohailseller@gmail.com");
        seller3.setProductPrice(19999.0);
        seller3.setSellerName("Sohail");
        seller3.setProductStock(100);
        seller3.setProductSold(50);
        sellerList.add(seller1);
        sellerList.add(seller2);
        sellerList.add(seller3);
        product1.setSellers(sellerList);
        productList.add(product1);
    }

    @After
    public void tearDown() {
        this.product = null;
        this.expectedProductList = null;
        this.expectedProduct=null;
    }

    @Test
    public void givenProductToSaveShouldReturnSavedProduct() throws ProductAlreadyExistsException, ProductNotFoundException {
        //act
        //when(productRepository.save((Product) any())).thenReturn(product);
        productRepository.deleteAll();
        Product product1 = new Product();
        product1.setProductId("10");
        product1.setProductName("Music product1");
        product1.setProductBrandName("Music");
        System.out.println(product1);
        Product savedProduct = productRepository.save(product1);
        //assert
        System.out.println(savedProduct);
        Assert.assertEquals(product, savedProduct);
    }

    @Test(expected = NullPointerException.class)
    public void givenDuplicateProductShouldReturnProductAlreadyExistsException() throws ProductAlreadyExistsException, ProductNotFoundException {
        //act
        when(productRepository.existsById((product.getProductId()))).thenReturn(true);
        productServiceImplements.saveProduct(product);
        productServiceImplements.saveProduct(product);

        //verify here verifies that productRepository save method is only called once
        verify(productRepository, times(1)).save(product);

    }



    @Test
    public void givenMethodCallToGetAllProductsShouldReturnAllProducts() throws Exception {
        //act
        expectedProductList.add(product);
        //stubbing the mock to return specific data
        when(productRepository.findAll()).thenReturn(expectedProductList);
        List<Product> actualProductList = productServiceImplements.getAllProducts();
        //assert
        Assert.assertEquals(expectedProductList, actualProductList);

        //verify here verifies that productRepository findAll method is called twice
        verify(productRepository, times(2)).findAll();
    }

    @Test
    public void givenMethodCallToDeleteAllProductsShouldReturnTrue() throws Exception {
        //act
        expectedProductList.add(product);
        //stubbing the mock to return specific data
        when(productRepository.findAll()).thenReturn(expectedProductList);
        boolean boo = productServiceImplements.deleteAllProducts();
        //assert
        Assert.assertEquals(true, boo);

        //verify here verifies that productRepository findAll method is only called once
        verify(productRepository, times(1)).findAll();

        //verify here verifies that productRepository deleteAll method is only called once
        verify(productRepository, times(1)).deleteAll();
    }

    @Test
    public void testAlgorithm() throws ProductNotFoundException, ProductAlreadyExistsException {
        when(productRepository.findByProductName(product1.getProductName())).thenReturn(productList);
        List<Seller> newSellerList = productServiceImplements.getSellerByProductName(product1.getProductName());
        System.out.println(newSellerList);
        Assert.assertEquals("Punith",newSellerList.get(0).getSellerName());
    }

}


