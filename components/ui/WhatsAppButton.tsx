'use client'

const DEFAULT_WA_NUMBER = '593999828903'

export function WhatsAppButton({ number }: { number?: string | null } = {}) {
  const digits = (number ?? DEFAULT_WA_NUMBER).replace(/\D/g, '') || DEFAULT_WA_NUMBER
  const href = `https://wa.me/${digits}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-[52px] h-[52px] rounded-full
        bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.45)]
        hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.55)]
        active:scale-95
        transition-all duration-200
      "
    >
      {/* WhatsApp SVG oficial */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="26"
        height="26"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16.003 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.366.638 4.682 1.848 6.715L2.667 29.333l6.784-1.779A13.27 13.27 0 0 0 16.003 29.333c7.365 0 13.33-5.97 13.33-13.333S23.368 2.667 16.003 2.667Zm0 24.267a11.006 11.006 0 0 1-5.618-1.543l-.403-.238-4.026 1.056 1.073-3.917-.263-.42A10.95 10.95 0 0 1 5.003 16c0-6.068 4.932-11 11-11s11 4.932 11 11-4.932 11-11 11Zm6.03-8.22c-.33-.165-1.952-.963-2.255-1.073-.303-.11-.523-.165-.743.165-.22.33-.852 1.073-1.044 1.293-.193.22-.385.247-.715.083-.33-.165-1.394-.513-2.655-1.638-.981-.875-1.644-1.956-1.836-2.286-.193-.33-.02-.508.145-.672.149-.148.33-.385.495-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.743-1.79-1.018-2.45-.268-.645-.54-.557-.743-.567l-.633-.011a1.21 1.21 0 0 0-.88.413c-.303.33-1.155 1.128-1.155 2.75s1.183 3.19 1.348 3.41c.165.22 2.328 3.556 5.642 4.987.789.34 1.404.543 1.884.695.792.252 1.513.216 2.083.131.635-.095 1.952-.798 2.228-1.568.275-.77.275-1.43.193-1.568-.083-.138-.303-.22-.633-.385Z" />
      </svg>
    </a>
  )
}
