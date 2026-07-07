import { FC } from "react";

/**
 * Placeholder Certifications slice component.
 *
 * NOTE: rendering happens inside BranchingTimeline (this slice is filtered
 * out of the SliceZone). This module exists so Slice Machine recognizes the
 * slice. Once you run `npm run slicemachine` the regenerated
 * `prismicio-types.d.ts` will include `Content.CertificationsSlice` and you
 * can swap this stub for the standard typed pattern if desired.
 */
type CertificationsSliceLike = {
  slice_type: string;
  variation: string;
};

const Certifications: FC<{ slice: CertificationsSliceLike }> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for certifications (variation: {slice.variation}) Slices
    </section>
  );
};

export default Certifications;
