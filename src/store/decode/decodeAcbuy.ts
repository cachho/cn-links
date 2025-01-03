import { acbuyStringsMarketplaces } from '../../data/acbuy';
import type { Marketplace } from '../../models';
import { marketplaces } from '../../models';
import { decodeAllChinaBuy } from './decodeAllChinaBuy';

export function decodeAcbuy(link: URL): {
  marketplace: Marketplace;
  id: string;
} {
  // https://www.acbuy.com/shop-detail?source=TB&sellerId=512766498&shopName=u[3046765323]&shopImg=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAATeSURBVGiB7dpRiFxnFQfw3zfZ1n1Y7ATykMI%2BbCFgwUgjBGww0gkimrLbvavJkwgprVgpxT4E2oJiwfZBUKxgn9pSpSkqqe5kU3SlKy7Yh0AjRAwYSMQVA%2B5DoCvsw9rMzvHh3p29M5nNzowxs9r8YWG/75575v%2Bf%2B53vfOfM5Q6Gi9RtMmpG7fYlTfsle283qRaSBpY0/Dadda67SQdixqSmV4ZKvDsWfOAr6VeWy5NtAmLGpDCLkdtKrVeES5JDqW5lY6rSulYzqukVO5U8JPfj2%2BWplgBVx3bgsumGx6NmdGOwKSB5YCh0%2BseY3fZtDDYFhD1DoTMISlwrN7P7X8AdAcPGh1BAWMP38ajwMhqlq9%2BSfEJ4Dosd1/4r6D9pVRxPs94uRj%2BOzDm8UYxPpVlLuBg1L6n6B6pYxQWcx180XVGxZt2apCoZV/F5IeuXU78CVkvkQao7FZk3sJDqlloXPqomfFcyn%2Bou9OD71fiiceveKTJuT%2BhXwFhkJspEY6r1YS%2BWDdOcecy37GY8INRwABPFZ69IfpZmvQnpl67Gw46422WM9UJokCA%2BHY84CDHtUypm8YtUt9jNODInIvN34QJewgnUcBiTwqmY9syGfXHarPdKZhABB1W8F5mQnEPVuidKhKuROdCyXnEK17bx%2BXTH%2BDe9kulXwDV8Uh6MhGVNR9LZnGDMOIzLmlZbd1Q9S0lQN3QeIpsu9UqovxgIX09nXIiaQ%2B7xI8ljRjwWmRet26vptOTlNOdKi1vdC3hhS5eZCfy1bfIjLrl%2B6wVck/JvPi1q4InIrAkncUJFQ7JsJScbj9gn7OksBWPGQ21em/Z21oXptNXIbr2APfhTZJ634odpUSPVPR3TRiRPSlh3JC1qFDHwe/mSu6/NS3QEe9eqHFzF%2BHak%2Bo2BMXxP1XsxYz/4p5NFdqbi9cjUhF/rcRu8CXrK4oOWjweEs7gvLVqLLC%2B00xmHiuv3bnVjqnfU4d1ioA8MXv9G285RFdZuWN8N/xokBvrB4AJSnj2LTFyVXBSeB2FU8qBdlnSPgav4uTAvebWr/9zHthhUwBWcBLt8ATTNbGyfkanhd1veHS6mM/n9Me1NyddusOmxwTBIJl61bqrUm/kylPf%2BvhA3PoGY6r0%2B71fAquRoOptnyuKbzs9FpVaHu5zHu109NB1NZxzdGKY550VH23BX7ztYP0soJz/bRuwbrf/ucRgL5IkIn%2BnmJM2ZjykPGvGxNOsnxfRrHWY3P3qU0JuAsCxMpbniDIQiWW3my%2BQH8bDPdfYuW/bHjWn4rPA4JjWdixl/0PSkZJy2pfRQNx%2BDC8i7xBNsChCe6dgl9rvb5cgsYElehY1LxoR9rtuPEclbwrs4qOmd4kT7VMttvhQnb62AnMjpyNRVPKVhVHKsi92Y8lOBaBs1jHi0WGLdsdt3xGbnbTv0G8SZpj%2BreN1gW/CyD3w6jt8YpJGZiGk/LQ6HPWMQEmPyamoQjEvmXScyS/KEBvdjzyAZeZit9Ini7z/Ch7CxtcPwfyQgbds52DkocS3/wPHHoZDpH6ve3zw4bgpY8ZbofgzYYXgtLRYlrJKAtGhNxVfdho7ywAiX3OWb5am2IE6z3pbM7NAnseC6I53HkK1fNag6Jnx86K8ahL9Zt7DVqwZ3MGz8G3AWg13zGnKoAAAAAElFTkSuQmCC
  try {
    const id = link.searchParams.get('sellerId');
    if (!id) {
      throw new Error(`Missing ID parameter from link: ${link.href}`);
    }
    const marketplaceParam = link.searchParams.get('source');
    if (!marketplaceParam) {
      throw new Error('Missing marketplace parameter');
    }
    const marketplace = acbuyStringsMarketplaces.get(marketplaceParam);
    if (!marketplace) {
      throw new Error('Missing marketplace parameter');
    }
    if (!marketplaces.includes(marketplace as Marketplace)) {
      throw new Error('Unsupported marketplace');
    }
    return { marketplace: marketplace as Marketplace, id };
  } catch (error) {
    // Try decoding as a AllChinaBuy link
    const { marketplace, id } = decodeAllChinaBuy(link);
    return { marketplace, id };
  }
}
