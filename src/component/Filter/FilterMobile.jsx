import React, { useState } from "react";
import { Drawer } from "antd";
import FilterProducts from "./FilterProducts";
import Button from "../Button";

const FilterMobile = ({ onFilterChange, onFilterPrice, onCategoryChange }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Nút mở drawer */}
            <Button label="Lọc sản phẩm" onClick={() => setOpen(true)} variant="normal" customStyle={{ background: "#ffffff", color: "rgba(0, 0, 0, 0.6)" }} />

            {/* Drawer chứa bộ lọc */}
            <Drawer
                title="Lọc sản phẩm"
                placement="left"
                closable={true}
                onClose={() => setOpen(false)}
                open={open}
            >
                <FilterProducts
                    onFilterChange={onFilterChange}
                    onFilterPrice={onFilterPrice}
                    onCategoryChange={onCategoryChange}
                />

                {/* Nút hành động */}
                <div className="flex justify-between mt-4">
                    <Button label="Lọc" onClick={() => setOpen(false)} variant="primary" />
                    <Button
                        label="Làm mới" onClick={() => {
                            onFilterChange([]);
                            onFilterPrice({});
                            onCategoryChange([]);
                        }}
                        variant="normal"
                        customStyle={{ width: "22%", background: "#28a745", color: "white" }}
                    />
                </div>
            </Drawer>
        </>
    );
};

export default FilterMobile;
