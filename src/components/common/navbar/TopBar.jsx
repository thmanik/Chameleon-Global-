import Link from "next/link";

const TopBar = ({ user }) => {
  return (
    <div className="bg-secondary text-white py-2 px-4">
      <div className="container mx-auto flex justify-between items-center text-[10px] md:text-[12px] font-normal uppercase tracking-wider">
        <p className="hidden sm:block">Quality Apparel Since 1996</p>

        <p className="mx-auto sm:mx-0">
          {user.role === "B2B"
            ? "Wholesale Portal Active"
            : "New Collection Live - Shop Now"}
        </p>

        <div className="hidden sm:flex gap-6">
          <Link href="/track-order" className="cursor-pointer hover:text-primary transition">
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;