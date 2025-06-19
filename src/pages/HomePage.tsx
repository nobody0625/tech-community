import { Alert, Carousel, ConfigProvider, Image } from "antd";
import React from "react";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Carousel: {
              dotOffset: 25,
            },
          },
        }}
      >
        <div id="homePage">
          {/* 轮播图 */}
          <div className="top">
            <div className="left" style={{ width: "800px", height: "350px" }}>
              <Carousel
                autoplay={{ dotDuration: true }}
                autoplaySpeed={5000}
                effect="fade"
              >
                <div>
                  <div>
                    <Image
                      preview={false}
                      width={800}
                      height={350}
                      src="public\images\image1.png"
                      style={{
                        display: "block",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <Image
                      preview={false}
                      width={800}
                      height={350}
                      src="public\images\image2.png"
                      style={{
                        display: "block",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <Image
                      preview={false}
                      width={800}
                      height={350}
                      src="public\images\image3.png"
                      style={{
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              </Carousel>
            </div>
            <div className="right">
              <div>
                <Image
                  preview={false}
                  src="public\images\image1.png"
                  height={110}
                  style={{
                    display: "block",
                  }}
                />
              </div>
              <div>
                <Image
                  preview={false}
                  src="public\images\image2.png"
                  height={110}
                  style={{
                    display: "block",
                  }}
                />
              </div>
              <div>
                <Image
                  preview={false}
                  src="public\images\image3.png"
                  height={110}
                  style={{
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
          {/* 文章与排行榜 */}
          <div className="bottom">
            {/* 小贴士 */}
            <div className="tips">
              <Alert
                message="Alert Message Text"
                type="success"
                closable
              />
            </div>
            <div className="left"></div>
            <div className="right"></div>
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

export default HomePage;
