import { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = (props) =>{
    const [otp, setOtp] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
    }

    return(
        <div> 
    <h3 className='text-2xl text-center font-semibold mb-4'>Click Confirm Ride to Pickup</h3>
    <div className="border-b border-gray-300 w-full mb-4"/>
    <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
            <img className='h-12 w-12 rounded-full object-cover' src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSERIVFhUVFRUWFRgVFRgVFRYVFRYWFhcVFRcYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGBAQFy0dHx0tLS0tLSstLS0tLS0tLS0rLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLf/AABEIARMAtwMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xAA9EAABAwIEBAMHAgUDAwUAAAABAAIRAyEEEjFBBQZRYSJxgQcTMpGhsfBCwRQjUtHhYrLxFSRDFjNjcqL/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAlEQEBAAICAgEEAgMAAAAAAAAAAQIRAzESIUETIjJRBHEUI2H/2gAMAwEAAhEDEQA/AOghqca1E0JxoSUMNR5UoBGmRo00k0k+klI9mDSRe7TxRIBg0k2cOpaOEBBOGSf4VWEIQgKx+ETZwgVsWpJYgKg4MdEkYJXHu0RpICnODTRwau/dJJooCop4WFLo0oUsUUptNACm1KISgERQCIQSkEAtoTjQktCcAQQ0EEEwJEUpJKASUSD3AamFnuLc54OgS11UFw2bc/RI2hSKtdrRLiAO65VxL2nE1IY2aXyd5rJ8Y5qxFd16jsmzZtHfqgnY8fzrg6Twx1SZ1IuB5lSmc04MxFZt+9h5nZeeq2IlIZiyJib6oD0lQ4xQeSGVWOI1AcLeacoY+k9xa17S4aibrzVhuIPaSWuIPYkKSzilQPDw9wd1kygPSqC49wH2g16cNqfzWjUu+IeRW74DznQxBynwO2DtHeRQGmQQBQTAkEaJICSSlIigEoII0A80JYRBKCYBBGiQBFUnNXHW4SiahidAOpU7jHEmYek6rUIAaCfPsuA81c1Vsa8l5hgPhaNANvMoCdxfnvFVi45srdA1ug7+aylSuXEk3JSJQIQBGdkQB3S4jdFlTBISg2UoeSBHdIG8kJdzCElLYQUgcp1oupFDGFpzC24UATunaRIQbrXKftAYQ2lXAFoDgbT3ldBwuIbUaHsMtIkLzPSJB106LpPs55nc14oVHSxx8M7G6Nk6oiRoimBFEUZRFICQQQQEkJSII0wCJxhGqLnTi38NhKlQfFEN8zYJhyr2mc0ur1TQZIp0yQe7husGSpFas5xLnXJJJJ6lRnFIBCImUcTulBiASSjbeyPKdk/h6YJvKVpyEspE2AS/4N/RX+DothTmUR0UeTWcW2VbhHA6dfrYpl+GeD8JW4ZhZ0RVMEOim52NJwy/LDgHcIyCteeGNOwS2cLbEQp+tD/xb+2Ppu9Cp+FcRDm2IIIIMXGlvOVdVeAt7z5WSanBHwMpB7R9lU5Mazy4Mo6FyRzj79op1yPeaB2gI799fktqvPrKT6JDocI1toV2Lk/jTcRRbfxBom8laSysbjYvyiKMokyEgjRICWEaARqgIrkntk4xLmYZpsPE79gurYuuGMc46AE/Jeb+a+Je/wATUq7F1vIaICocZSITrWyle7lTs9I4anGgKQcOI6pIpEFA0S3spVBt9EmnT7J+m0hTavGLTClWlJUlJ8K2oVB1WddGKewQApJpgjZVxqJym89VFrWRLZRUzD0PyCYTWBeCDJ8vrZWdIxc3FwJvP5cQstNtmH0RbS+ndNijGnRTnVmnVu/RDM09dfohOz1OjTe0Nc0dP8qp4Jg3YLHhon3VWYjSeis8O4A6qfiWB7Gn9TCHN6ghVjn41hyce406JFRfLQRuAUpdjhEgjQQEtBGiVBSc5Yr3eDrO6MP1C83lsldw9r9UtwUAxmcAfJcQYDslRCmDZTGU4ERrrG/RRaZIMp1wm6lciRTsI/b6Sm3C6Njulk8ykN0tqmJprCn20jN/snckaIOqdVNrSYgGwp9B1tVGpBpUqnh50UVcmj9MGNfzqnqTTuUy1hCP35U6ayrDCAA/EVbUsTlsJg7bT+bfgo2Vvz+yusKxsAm9tFnWkSxjABene8XmLmyOlXaRcEHsibWAHwn10Rmuw2ydtbfZA0Xm6Qn8PXh0KLSpAfDafzRPFpBU0q0/Bnywj+kkfO6nqi5eq+N7Z/SD8jCvl2cd3jHnck1lQQRoLRCUiRpjF1wxj3nRrS75CUBzT2uY+lUyYcPGZpzOHS1h5rmOJwZaJbcdknEvdXrvqOJJc8uJPcypmFq5XZTcLK5OicXpDY6QltHebKVjaA1aotJl097TcdHKSdlJISgElQ6ZISQxOsNkHKa0kLoxNyn3Y5rd5VZXqONhojoYJzrHT866I1Pkrb8LdnF6ZMT9P7KUx7HCxBnoVS/9CzGGuaT53ChY7BVqEF4cGnR23zHql443qn9TPHuNfSox38rlXfBXS0g6jYnUaGFzfDcdc34XZfr6q+4VzNJh5EHsLbKcsLGmHNK3AotcQBeCO1t/qUrC+OQ1thO1jE7qnbxhrC9zSIDDAHU6fVM47izqDaTWujOJJGt+v5usdujS+w0GSBF/Sd046reFQ4bjNGA0vg77/n+VZDEt1a8Humzy9rrgf/v+bD+y0yynAK7TWZBBlrvstWurh/Fwc/5AgggtWSUqPnWrlwOIP/xOHzsrtUnOlHPgq7f9BPyIKL0ePccM4bSDBmduk8SxtJo8P01Ki8UrQ7KNlC/hSbuHkFz/APXdv1qLPDPzIoIJA0KVgqJaATulVBc+SqM8+jbikko3JIKKmH6YKNxOyk4SnI/PkVLOHBGijbWKj3oG3kN5/ZPDHsHxVcv+lgv5Tr9lIxHBS4GCR2k/uoGFoUmuhzQCOqPQ+5KbxXDktBpF5kXqvgCSBJJPhF5noCm8ViqVaWZXUvFlB94alIkWsZLSO4KnM4JQquzFpIJvkfeI2H+eitK3CWHDfwoOVoqe8Dyz+ZmDYAMOiLxpojePwPHPfvphK/DHN+KxmI+zh2T2EwUHxEhXnFeGVHNY54Ac3wktdma8CLjpYTCfw+FtlIBhK8no8eGbSOCcMzENBBBIk/VROcXkVMo0a0AHvP8AwtTy/gmtqN8P1g3tZV3G6DGvPvBbN+oSIJMxJuY/ZY437m+eP2aYKliXEiASel/2V3gqdd3wteBpeR232S8fSbTaKgw5DXO8D5NMTOo0Ma7DVSsPzSaeVlRwIexjw5lRtYNztnLUtIeN2zYyunds9Rx6kurWm5Da9mKYx51DzfyK6eud8m4n3+IY6BNMOJI0Ic2xHa66Ir4buMuaay0NBBBaskhQON082HrNG9N/+0qcUhwQHnDE4cFweLi09keMJaTv0Oq0PNfBzhcS5seBxLmHYtJmPMaKocW6sif1Ndoe46Fc1juxy9bhkVAQCE2TcDbVEanigJTHXPrr5K8Wed9GqhufNJajc5ECilissBUAsrigyVnKL7q5wOJ7/LVY5OjD2uaWEkKPiOX8+oUvCYkaSrzCVwRBHn+baLDd26JjNMtS5eLDo780U6nwtxu82A6zH5Zat8R8+5Pr8vooGPIy/nb+6fRWb+GUq4YuqCwDQY/ZD+GMz0/AnMVWyk+e3okHESSPL5plIu+HNsOqXxzBNe33hZmixA1jX100PQIcOm1le4ducFhG1vRTuSrsumAc9lZvunMzNFw3M4DN2v4TE/5ULG8rU35jSBZm2c4ODLz4TbyWj4twDxkssZ7fkaJrA8NqNIL4IBmFX1fHpn9GXtY+yXhj6barn6w1o8tV0NUvKtENpOgRLz9AFdrt4/xleby/lZ+gQQQWjM8UgpRSCUBzb2sv8VIdGuP2XNGUc7oEyTAA1JOgC6L7VKzTUY0ahpn1XN3OLXBzdQZHmFnlG2F1D7sKabnNd8TSWuEgwWmCJHdAugE7Wv3vH7prCPJsU/TYTI2i94geqUh5X0itdOv+Sg43sZ0+ycrC/UQB3GgiPzVMkkWIv9U7E406x6l4evCr6ak0mrLKOjDJf4LEkRf89VoeGYuT1/P8LH4Rx6q+4Y+4jsufLF145bbBlQHQ/h/AofFqrWNc58AXj1/eTCbwNeBO4/NfmsrzXj3VKkD4W7dSUYzdGWXjEN9YvdbqtHwbhNszjfusVh8blHdWv/rJtMDNc9B91WWN+IjHLGe7dOh0aQMBuuitsPgHi8G2q5bwnm0uqZhb7rf8P5jeQDmOnULK6xv3xtPLKbwsq0xuGafEBf8ALKoqAA3UvCcTD3Fvy87/ALBQ+MvAkrO2X2clnqtBwFsUR3Lj9VZKFwenlo0x/pB+d/3U1erhNYx4vJfvv9jQRIK0FkpDijJUbGvim8jZpP0Qbj3OmL95iahGgOUeizFRqm4mrJJOpJPzKiFZ1tOicOyJS61o1AMz3jSyJiLEBw8RMwQDPXb6JlkKq1oHf0vqN9CmCywNo11uLxfpcfZG5+Z5m46yD9kyHFt7EXsfvY9JQUpbB++hvZSaDvkodNw/t2UhhjXe/mL7qLGmNWdA/n+FaUq2XfTf89VVYQjY6X1i3ySjUl0WIv56m3yWNx26JnqNTw6sXmZsPv17W/Nk5jOFMqHNJBj8so/D4ay+g6mJPT87p7+MYAfFZpAPrpJ/NFPj+lee+1NxHlBp8TKjgfKxKy/E+XatLM5zS4DVwvroTC2GM40RMHebgAEES2HHW0n8CjB7jNwZbmGU+KT063mL6iw8QnXHynbHO43qMdwtjy8Cm0ucdGgST8ls8AMbdlOg8vj9UNaNpc4kD0BlM0MSTma0hmhzCJuDIkaCMx2jLrutXy7xSaj6LrlmWDGpi89/T9lPLN+9K4s/H1snlnhlShmdiKmes7WD4Wz/AE2/ZWdZnvajKf8AU4A+W/0lMcZeWua4fqt67KfywzPWLj+hv1db7SueY3LObdOWcx47Z8NaAjRIwvTeONBEjQAcU5ToB7S07ghNNElTqTYV4T3ssq8/828Gfha7qbhaSWHq0qjlegudOWmY2iW6VG3Y7oenkVwHiGEfRqOp1GlrmmCD+aKM8dVphnuGgU/XEtsReCAJ6dfT6KK4pTXy3WHA2ttbUqFVHqNgZZMTYd9ifmmWO+IHcR5XH9lNe8AOMiQBM6lxMeH0k9lAdeTFr+V9kJLa+LW+hPzhLFTT+3ooZI+SkGo222ggDtBJ/Nz5JaVKtRiopTPisBG4JuD853ScGY0Hr/zr/hVj6+kTA6/QkaKTUeyBBOa/aXCNhpIJjeWd7LxVclnU4s51i7LZ12zfeB2kZf8AhNYPijoLYkuIcNxa+jjJ31/qOig+7c905gCSTeSJnoNBdG7guKacwaHCxDmOEa94IKPUE8qfryTlzA6jePD09N+imcPmJu0kgGDAgGYhwtGvrCb4fgMR8XuC7R2rdLTPi9Z7R1U5+OLBlq0XU9buaS3feY1y6nY9krWkw+am0eD4ksfUBY7MSQQ9siTJuTaMoESLE+Yq2VqtF8Xa57x0Pw6u0IAEnpv6WmB4lTa0BxsfFYzsSRbTYafdJx/EKLqboEggwbGHHpuDN0plflWXHjr1Vl/1N1WiRUIL2vzC0HJmIGm8OC2fI1L+U9/9ToHk0f3K5VwjHBzssmzfXUXA0Og1/wArtXAMJ7rD02RBDQT5m5nvdGOH37Z58n+vSxRokFu5gRokEBU8k8QqYqmcQ8ZWvJ923o0bnuVqAue+x3jLKmF9wT46J06scZafuPRdGAXRrTLZLXLJc/8AJjcbT95Thtdosf6h/S5a8tRAwps2cry5isO+m51Oo0te0w4HUKJmgr0FzxyZRxrc4GSs0eF4GvZw3C4Lxnh1TD1HUqzYc35EbEHcLDLHTeZbhrNo7LOwk+dz9VHxPyEbD/KFGrcA32ufyyKpVIsBbePXfcKQjkIZpujDgYkQLnz/ADRFUmTMdNUAumTY/L7pwUTIkGS3Nv8ACTAM9P7JDWRpYz+rboR3VjneWgtjwyAZBLiAQ0AZZttOluqAlYSpDAQ6xiW99CSP1eKfSymUuKGg7LII7bHonsVQYaQyNa90w1wJJIbcwNOg2BJm0qv4phCLxLQ3bUifC8kTqCCOwCixthnZ00eB4i10Gm4Bw2NheLHtIFwNlq8BiKdQDNTBJF9ZExEAajWe4J0uOMe/c11rDa+gnqrThvHqzTAqWhx00gExPmAPVLxrbHnxnfp1Zww7Wg5BcXEjWJiNrqm426iKVRzabQSwts2DB1n6rP0uPvqnKXeLpBkANzG4F4ghSqdI1JDiIcHC7m9JmJv1tE+qizLa8uTCzvaHyBwkVsS1pEtb4nHaBFvzqu3LL8gcIbRw4fH8ypJcYvEwB2sNrLULpkefaNGko0yAokRKCA86cucbqYOuyvT1afE3Z7Dq0/msL0jwDjFLF0GV6Lpa4erTu1w2IK8tLWez3m52Ar+Ik0KhAqt/p2FRo6jfqPILoZV6KlEXJqjXa9ocwgtcAQRcEHQhGkCiVk+deU6WNp3GWoPhcBcH9x2WplIeps2cunmDjvBq+FqZKrYIPhcPhcOoP7KD70FsXHf7z2XpLj3BaWIYWVWBwPX7joVxLm7kmrhSX0wX0v8A9NHfqO6yuOmsu2WfE20+6Rm6+iBvcJ98OAynz/upBDa5cQCbAz8h/j6p2pWBcDF4uP6i6ZEg3F9oN/lFA18v3CfoYh3wi1nC0NMGSZd21k9OiCaPg+IAZUl2UVPCAbgamleNAL9ZIntIxGGc7K8NEHLd0Eu8L3PiYnK5rrbAaCCRS1KwytYPiDQcoNhYZQ6NwCd99tVbUOI5AQNS3JbVuUBpcG9QMoI3nsQkqVY8N5fZiNZY12paRq6couCRoD3JIHRRWcowYlrmgkX1Piy2IMA3b6jzS+F8XuaeZrJDHyYvBzgONtng6ak6SFa4LHONd8RBjOJPhc4gZZ/SQaYB2JdO8Kdaabl7M4nglOmB7kEAZSTF3NdUEEHc7GbjLPlZcvNim1jROdzXAggw9+YDMQLQ0EgkaRoCExRxMZKTjDW58rj/AEuZVJIjoQ246W1vcck4MvqOc6Ypl0h1znL3byREX8zYwnIWWTcYanlaGwBAAgaCBFk6ko1oyKQRISmBFBJJRpB5mLUMqdIRZV1aZuk+yXnD3ZGBxDvA4/yHE2a4/wDiJ6Hb5dF2KF5ULV3D2Z84/wAVS9zWd/PpATP/AJGCweO+x7+aVhN0WppwSnVE056gzdRVmOohwIIVm4qPWZKVOVyLm7khpJqYYBrtS3RrvLoVznE0H03EOBa4ag2K9GY7CyFhuZuBU6wOYQ4aOGo/uFncWm3KG1+vzTjH+o32MdLJ3ivC30XQ4eRGhUISpJZURGaoC0uZEB0GYygHUSIJ66BPsxOj3MLtSfEBJOZpBOTSLWgiFCwtAvgAX7LTYLl/F4huWnRlgy0w7LGaCGt8WUSBAF9pSPTP8MxJpva90k5gQevePMD6q9wWPeM0/FIq2ucoLTm6CA2fVNcR5OxVN7m+5d8QboSAfOL7X0sfNT+F8r4vPlNCzmtY4uB8JkA73tYzqCYN7mhKktx3vK1MABxdOVouH+7hrSDrJDSBYQWeo6nwDh/uWGQMznOcSNSCbT3iFVct8stouFVxzOiBIkt7B3mSfMladOQWlI0lBURSBKTKIlBA4oJDiiQbzoQgAllEuvTIUJ/AYypQqsrUnZXsMg/cHqCLHzTQCNGht6A5Z44zGUG1mWOj27seNWn9uxCtMq4VyVzC7BVw4kmk+G1W9tngdRPyld6okPaHNILXAEEXBBuCFlljoGikFSTSSTTUmgV6dln+JYKVqarFCq4adlNVHP8AiHL4rAtI1WQ41yDiaI940Z6e5b8TZ6j9wu30uGgXhZrmfnIYWuyhRayo9pDqoeTlaP0tkfq38o6qNXK6i96UHs25HOIdne0tpNMOcRGY7tbP3XcsFgqdJoZTaAB0C5s32oviBRotP/3cRG9g0R810LgXFqeKosr0j4XC43a4atPcJ5cWWHZXLajxjgaj+znD6pnKOgXPOM8z1MPj8QPiZ759ul9lp+D8y0a4s4T03VXGwtrxBJDp0QlSZSOUmUJQQykkoyUklAJcUElxQQHnehVzCYjzTiQ1LldcZjCNoRISmNFrrHsc5kDv+wrOvBdhyTqBd1L0uR2noFyPMn8JiX03tqU3Fr2ODmuGoc0yCPVKzc0Hqp2DTZwSxPLPtEr4inJwrXObAdkqFsujoWmJ81dt51a0fz8LiKXchrm+hkT8ly22eq08VueHkpxnDRuU3wzj9CvHu3Ek7Fjgfsp2IrZWucLkAmDb5qbdnpjfaTzGzhuFL2NzV6ngpA6NJ1qP7DpuYHUjgHB6hfUc6o4ue5xc5zjckmSSume0Ck/FUHl5lwcHdoiIHQLk+FeWOHXQ+i04rrLYyjY4qlDDp5b/ADWt9iPFnNrVsM4+FwD29nCx+YCxlCrmbG/5spPIlSpS4jRe2Yc4sd5XK6f5XUqcJ7ROZHZsZiZ19/V/3lVbKzmGWkg9QtF7R+HOw/EKhPw1j7xvr8Q+f3Wcqs3CmasKtXwXnZ7IbVuOq23DOYqNUWcJXGCl0q7mmWkg9lGWEo272x4OiVK5RwTnKpTIFTxDrut7wzmKjWAyuErG42K2upSCUkPB0ROKQE4ok25yCA8/JaCC6kDKCCCooBRtQQUqdA9j2IcMa6mCcj6Dy5uxLC3KfMZj8yu4YamHsLXgOBsQRIQQWPL2qdIXBcHTp1ajabQ0DTXr3Vnix4HeR+yCCxivlyrj4/7er5D/AHBcg4i0e8+SCCvjPNdcJcY12XVvY7gqZouqFgL87xJF4zIILp/kfhGeKD7dqDfdUXx4hUgHeC0yPoFymmbBBBRxdDI3UCaRoK6klKpV3NMtcQeyNBTQ6jyhjKj6YzOJ81pnFBBYXtU6MuKCCCRv/9k=" alt=""/>
            <h2 className="text-lg font-medium">Mubashir Iqbal</h2>
        </div> 
        <h5 className="text-lg font-semibold">2.4 Km</h5>       
    </div>

    <div>      
        <div className="w-full mt-6">
        <div className="flex items-center gap-8 pl-4 mb-3">
            <i className="text-2xl ri-user-location-line"></i>
            <div>
                <h3 className="text-xl font-bold">12/H/3/4</h3>
                <p className="text-lg -mt-1 text-gray-600">Munsi Talab, Kolkata</p>
            </div>
        </div>
        <div className="border-b border-gray-300 w-full mb-4"/>

        <div className="flex items-center gap-8 pl-4 mb-3">
            <i className="text-2xl ri-user-location-fill"></i>
            <div>
                <h3 className="text-xl font-bold">9/B/4</h3>
                <p className="text-lg -mt-1 text-gray-600">PW Vidayalaya, Kolkata</p>
            </div>
        </div>
        <div className="border-b border-gray-300 w-full mb-4"/>

        <div className="flex items-center gap-8 pl-4 mb-10">
            <i className="text-2xl ri-bank-card-2-fill"></i>
            <div>
                <h3 className="text-xl font-bold">₹69.3</h3>
                <p className="text-lg -mt-1 text-gray-600">Cash</p>
            </div>            
        </div>
      </div>

      <div className="p-4">
        <form onSubmit={(e)=>{handleSubmit(e)}}>
            <input
            required
            value={otp} 
            onChange={(e)=>{setOtp(e.target.value)}}
            type="number" placeholder="Enter OTP"
            className="bg-gray-200 font-mono rounded-md px-4 py-2 mb-4 border w-full text-lg mt-3" />
             <Link to="/captains/riding"
            className="flex justify-center w-full bg-yellow-500 text-white font-semibold p-2 rounded-xl mb-3">Confirm Ride</Link>
            <button onClick={()=>{props.setConfirmRidePopUpPanel(false);}}
            className="w-full bg-red-500 text-white font-semibold p-2 rounded-xl">Cancel Ride</button>
        </form>
      </div>

        {/* <div className="flex justify-between gap-6">
            <Link to="/captains/riding"
            className="flex justify-center w-full bg-yellow-500 text-white font-semibold p-2 rounded-xl">Confirm Ride</Link>
            <button onClick={()=>{props.setConfirmRidePopUpPanel(false);}}
            className="w-full bg-red-500 text-white font-semibold p-2 rounded-xl">Cancel Ride</button>
        </div>  */}

    </div>
        </div>
    )
}

export default ConfirmRidePopUp;