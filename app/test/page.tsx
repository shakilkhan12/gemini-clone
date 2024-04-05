import Image from "next/image"

const page = () => {
  return (
    <div>
        <nav className="w-full h-[96px] bg-[#162a32] fixed top-0">nav</nav>
        <div className="h-screen relative w-full">
            <Image alt="hero" src="/hero1.webp" fill className="absolute inset-0 size-full -z-10 object-cover object-top" />
            <div className="absolute inset-0 size-full bg-transparent flex items-center justify-center">
                <div className="w-full lg:w-[600px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus dolor eius facere eaque est! Dolores cum amet recusandae a obcaecati!</div>
            </div>
        </div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio debitis officiis ipsam atque nobis quaerat ea iure eum error. Placeat commodi quibusdam voluptate nulla ipsam aspernatur suscipit possimus optio! Nihil!s
    </div>
  )
}

export default page