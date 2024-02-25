import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DummyData } from "../../dummyData";
import { TProductInterface } from "../../types/ProductType";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import {
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import SingleSlide from "../../components/Carousal/SingleSlide";
import { toast } from "react-toastify";
import BackButton from "../../components/Button/BackButton";
import { setCart } from "../../Redux/reducers/slices/cartSlice";
import { useDispatch } from "react-redux";
import React from "react";

function ProductDetails() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [productDetail, setProductDetail] = useState<
    TProductInterface | undefined
  >();
  const [numberOfItems, setNumberOfItems] = useState(0);

  const IncrementNumber = () => {
    setNumberOfItems((prevNumber) => prevNumber + 1);
  };

  const DecrementNumber = () => {
    if (numberOfItems < 1) {
      toast.warn("Your quantity is already zero");
      return;
    }
    setNumberOfItems((prevNumber) => prevNumber - 1);
  };

  const AddToCart = (event: any) => {
    event.preventDefault();

    if (productDetail && numberOfItems > 0) {
      try {
        dispatch(
          setCart({
            product: productDetail,
            quantity: numberOfItems,
            image: productDetail.images[activeImageIndex],
          })
        );

        setNumberOfItems(0);
        toast.success("Your item has successfully been added to your cart");
        navigate(-1);
      } catch (e) {}
    }
  };

  useEffect(() => {
    const data = DummyData.find((item) => item.id === slug);
    setProductDetail(data);
  }, [slug]);

  if (productDetail) {
    return (
      <>
        <div className="md:hidden">
          <BackButton />
          <SingleSlide images={productDetail.images} />
        </div>

        <Container>
          <div className="w-full md:flex flex-col xl:flex-row gap-20 items-center mb-4 xl:mt-16 ">
            <div className="w-[1200px] relative hidden md:block">
              <BackButton />
              <img
                src={`/${productDetail.images[activeImageIndex]}`}
                loading="lazy"
                className="aspect-video h-[450px] max-w-full rounded-3xl object-fill"
                alt=""
              />
              <Box
                marginTop="1rem"
                display="grid"
                gridAutoFlow="column"
                gap=".5rem"
                width="100%"
              >
                {productDetail.images.length > 1 &&
                  productDetail.images.map((image, index) => (
                    <div
                      key={index}
                      className="h-28 bg-gradient-to-b from-neutral-400 to-neutral-300 relative rounded-3xl"
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img
                        src={`/${image}`}
                        className={`w-full h-full object-fill cursor-pointer rounded-3xl ${
                          index === activeImageIndex
                            ? "mix-blend-overlay border border-[#FF7E1D]"
                            : ""
                        }`}
                      />
                    </div>
                  ))}
              </Box>
            </div>
            <div className="mt-7">
              <Typography
                color="#FF7E1D"
                fontWeight="bold"
                className="!text-base"
                marginBottom=".5rem"
              >
                AZMERCH
              </Typography>
              <Typography
                marginBottom="1rem"
                fontWeight="bold"
                className="!text-2xl sm:!text-4xl"
              >
                {productDetail.name}
              </Typography>
              <Typography marginBottom="1rem">
                {productDetail.description}
              </Typography>
              <Typography
                marginBottom="1rem"
                fontWeight="bold"
                className="!text-xl sm:!text-2xl"
              >
                ${`${productDetail.price}`}
              </Typography>
              <div className="flex gap-4">
                <div className="bg-[#f6f8fc] flex items-center justify-center gap-4 rounded-xl p-2">
                  <IconButton onClick={DecrementNumber}>
                    <MinusIcon className="w-6 h-6 text-[#FF7E1D] cursor-pointer" />
                  </IconButton>
                  <p className="font-bold">{numberOfItems}</p>
                  <IconButton onClick={IncrementNumber}>
                    <PlusIcon className="w-6 h-6 text-[#FF7E1D] cursor-pointer font-bold" />
                  </IconButton>
                </div>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon className="w-6 h-6 font-bold" />}
                  className="!bg-[#FF7E1D]"
                  onClick={AddToCart}
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  } else {
    return <></>;
  }
}

export default ProductDetails;
